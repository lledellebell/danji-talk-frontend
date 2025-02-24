import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRegisterStore } from "../stores/registerStore";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const useRegister = () => {
  const {
    email,
    emailCheckStatus,
    password,
    confirmPassword,
    name,
    nickname,
    birthday,
    phoneNumber,
    setError,
  } = useRegisterStore();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
        nickname,
        birthday,
        phoneNumber,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
        );
      } else {
        setError("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  const register = () => {
    if (!email) return setError("이메일을 입력해주세요");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return setError("이메일 형식이 올바르지 않습니다. 다시 확인해주세요.");

    if (emailCheckStatus !== "checked")
      return setError("이메일 중복 확인을 해주세요");

    if (!password || !confirmPassword)
      return setError("패스워드를 입력해주세요");

    const passwordValidationRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (password !== confirmPassword)
      return setError("패스워드가 일치하지 않습니다");

    if (!passwordValidationRegex.test(password))
      return setError(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다"
      );

    if (!name) return setError("이름을 입력해주세요");
    if (!nickname) return setError("닉네임을 입력해주세요");
    if (!birthday) return setError("생년월일을 확인해주세요");
    if (!phoneNumber) return setError("전화번호를 입력해주세요");

    registerMutation.mutate();
  };

  return {
    register,
    isRegistering: registerMutation.isPending,
  };
};
