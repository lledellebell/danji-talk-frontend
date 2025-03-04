import axios from "axios";
import { useRegisterStore } from "../stores/registerStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export const useCheckEmail = () => {
  const { email, setEmail, setError, setEmailCheckStatus, setAuthCode } =
    useRegisterStore();
  const [actionButton, setActionButton] = useState({
    label: "중복확인",
    disabled: !email,
  });

  const checkEmail = () => {
    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    setActionButton((prev) => ({ ...prev, disabled: true }));
    checkEmailMutation.mutate();
  };

  const checkEmailMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${API_URL}/api/member/check-email-duplication`,
        { email: email }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("res", data);
      if (data.isDuplicate) {
        setEmailCheckStatus("duplicate");
        setError("이미 사용 중인 이메일입니다.");
      } else {
        setEmailCheckStatus("checked");
        setError(null);
      }
      setActionButton((prev) => ({
        ...prev,
        disabled: false,
      }));
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(
          !error.response
            ? "네트워크 연결을 확인해주세요."
            : "이메일 중복 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
      }
      setActionButton((prev) => ({
        ...prev,
        disabled: false,
      }));
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    setEmail(newEmail);
    setEmailCheckStatus("initial");
    setError(null);

    setAuthCode("");
    setActionButton((prev) => ({
      ...prev,
      disabled: !newEmail,
    }));
  };

  return {
    checkEmail,
    handleEmailChange,
    checkEmailActionButton: { ...actionButton, onClick: checkEmail },
    isCheckingEmail: checkEmailMutation.isPending,
  };
};
