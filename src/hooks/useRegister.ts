import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRegisterStore } from '../stores/registerStore';
import { useAlertStore } from '../stores/alertStore';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const { openAlert, setTitle, setContent } = useAlertStore();
  const {
    email,
    emailCheckStatus,
    password,
    confirmPassword,
    name,
    nickname,
    phoneNumber,
    setError,
  } = useRegisterStore();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/member/signup`, {
        email: email,
        password: password,
        name: name,
        nickname: nickname,
        phoneNumber: phoneNumber,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
        );
      } else {
        setError('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  const showError = (message: string) => {
    openAlert();
    setTitle('실패');
    setContent(message);
  };

  const register = () => {
    if (!email) return setError('이메일을 입력해주세요');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return showError('이메일 형식이 올바르지 않습니다. 다시 확인해주세요.');

    if (emailCheckStatus !== 'checked')
      return showError('이메일 중복 확인을 해주세요');

    if (!password || !confirmPassword)
      return showError('패스워드를 입력해주세요');

    const passwordValidationRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (password !== confirmPassword)
      return showError('패스워드가 일치하지 않습니다');

    if (!passwordValidationRegex.test(password))
      return showError(
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다'
      );

    if (!name) return showError('이름을 입력해주세요');
    if (!nickname) return showError('닉네임을 입력해주세요');
    if (!phoneNumber) return showError('전화번호를 입력해주세요');

    registerMutation.mutate();
  };

  return {
    register,
    isRegistering: registerMutation.isPending,
  };
};
