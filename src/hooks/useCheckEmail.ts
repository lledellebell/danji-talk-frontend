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
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const checkEmail = () => {
    if (!email) {
      return;
    }
    setActionButton((prev) => ({
      label: prev?.label || '중복확인',
      disabled: true,
    }));
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
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
    onSuccess: () => {
      setEmailCheckStatus('checked');
      openDialog();
      setActionButton(null);
      setSuccessMessage('사용 가능한 이메일입니다.');
      setErrorMessage(undefined);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage('이미 등록된 이메일입니다. 다시 시도해주세요.');
      }
      setActionButton((prev) => ({
        label: prev?.label || '중복확인',
        disabled: false,
      }));
      setSuccessMessage(undefined);
    },
  });

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
    onSuccess: () => {
      openAlert();
      setTitle('성공');
      setContent('인증번호가 전송되었습니다.');
      setActionButton(null);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          openAlert();
          setTitle('실패');
          setContent(error.response?.data?.message || '인증 코드 전송 실패');
        }
      }
      setActionButton(null);
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
    setEmailCheckStatus('initial');
    setAuthCode('');
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    setActionButton({
      label: '중복확인',
      disabled: !newEmail,
    });
  };

  return {
    checkEmail,
    sendEmailCode,
    handleEmailChange,
    checkEmailActionButton: actionButton
      ? { ...actionButton, onClick: checkEmail }
      : undefined,
    isCheckingEmail: checkEmailMutation.isPending,
    successMessage,
    errorMessage,
  };
};
