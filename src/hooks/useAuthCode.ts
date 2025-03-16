import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRegisterStore } from "../stores/registerStore";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export const useAuthCode = () => {
  const { email, authCode, setAuthCode, setAuthCodeVerified, setError } =
    useRegisterStore();

  const [actionButton, setActionButton] = useState({
    label: "인증확인",
    disabled: !authCode,
  });

  const authCodeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${API_URL}/api/mail/certification-code/verify`,
        {
          params: { email: email, code: authCode },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isValid) {
        setAuthCodeVerified(true);
        setError(null);
        setActionButton((prev) => ({
          ...prev,
          label: "인증완료",
          disabled: true,
        }));
      } else {
        setAuthCodeVerified(false);
        setError("잘못된 인증번호입니다. 다시 입력해주세요.");
        setActionButton((prev) => ({
          ...prev,
          disabled: false,
        }));
      }
    },
    onError: (error) => {
      setAuthCodeVerified(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "인증번호 입력에 문제가 발생했습니다."
        );
      }
      setActionButton((prev) => ({
        ...prev,
        disabled: false,
      }));
    },
  });

  const checkAuthCode = () => {
    if (!authCode) {
      setError("인증번호를 입력해주세요.");
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
      label: "인증확인",
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
