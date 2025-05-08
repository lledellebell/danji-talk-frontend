import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRegisterStore } from '../stores/registerStore';
import { useState } from 'react';
import { useAlertStore } from '../stores/alertStore';

export const useAuthCode = () => {
  const { email, authCode, setAuthCode, setAuthCodeVerified, setError } =
    useRegisterStore();

  const { openAlert, setTitle, setContent } = useAlertStore();
  const [actionButton, setActionButton] = useState({
    label: '인증확인',
    disabled: !authCode,
  });

  const authCodeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(`/api/mail/certification-code/verify`, {
        params: { email: email, code: authCode },
      });
      return response.data;
    },
    onSuccess: () => {
      setAuthCodeVerified(true);
      openAlert();
      setTitle('인증확인');
      setContent('인증되었습니다.');
      setActionButton((prev) => ({
        ...prev,
        label: '인증완료',
        disabled: true,
      }));
    },
    onError: (error) => {
      setAuthCodeVerified(false);
      openAlert();
      setTitle('인증실패');
      if (axios.isAxiosError(error)) {
        setContent(error.response?.data?.message);
      }
      setActionButton((prev) => ({
        ...prev,
        disabled: false,
      }));
    },
  });

  const checkAuthCode = () => {
    if (!authCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }
    setActionButton((prev) => ({ ...prev, disabled: true }));
    authCodeMutation.mutate();
  };

  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAuthCode = e.target.value;

    setAuthCode(newAuthCode);
    setAuthCodeVerified(false);
    setError(null);
    setActionButton((prev) => ({
      ...prev,
      label: '인증확인',
      disabled: !newAuthCode,
    }));
  };

  return {
    checkAuthCode,
    handleAuthCodeChange,
    authCodeActionButton: { ...actionButton, onClick: checkAuthCode },
    isCheckingAuthCode: authCodeMutation.isPending,
  };
};
