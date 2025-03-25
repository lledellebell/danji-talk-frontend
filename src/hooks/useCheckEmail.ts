import axios from 'axios';
import { useRegisterStore } from '../stores/registerStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useDialogStore } from '../stores/dialogStore';
import { useAlertStore } from '../stores/alertStore';

export const useCheckEmail = () => {
  const { openDialog, closeDialog } = useDialogStore();
  const { openAlert, setTitle, setContent } = useAlertStore();
  const { email, setEmail, setEmailCheckStatus, setAuthCode } =
    useRegisterStore();
  const [actionButton, setActionButton] = useState<{
    label: string;
    disabled: boolean;
  } | null>({
    label: '중복확인',
    disabled: false,
  });

  const checkEmail = () => {
    if (!email) {
      return;
    }
    openDialog();
    setActionButton((prev) => ({
      label: prev?.label || '중복확인',
      disabled: true,
    }));
    checkEmailMutation.mutate();
  };

  const sendEmailCode = () => {
    closeDialog();
    sendAuthCode.mutate();
  };

  const checkEmailMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `/api/member/check-email-duplication`,
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    // TODO: 성공 처리
    onSuccess: () => {
      setEmailCheckStatus('checked');
      openDialog();
      setActionButton(null);
    },
    // TODO: 실패 처리
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // openAlert();
          setContent(error.response.data?.message);
        }
      }
      setActionButton((prev) => ({
        label: prev?.label || '중복확인',
        disabled: false,
      }));
    },
  });

  // TODO: 성공시 처리
  const sendAuthCode = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `api/mail/certification-code/send`,
        {
          mail: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {},
    // TODO: 실패 처리
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          openAlert();
          setContent(error.response?.data?.message || '인증 코드 전송 실패');
        }
      }
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
    setEmailCheckStatus('initial');
    setAuthCode('');
    setActionButton((prev) => ({
      label: prev?.label || '중복확인',
      disabled: !newEmail,
    }));
  };

  return {
    checkEmail,
    sendEmailCode,
    handleEmailChange,
    checkEmailActionButton: { ...actionButton, onClick: checkEmail },
    isCheckingEmail: checkEmailMutation.isPending,
  };
};
