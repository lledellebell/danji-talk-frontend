import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ResetPassword.module.scss';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import Alert from '../../components/common/Alert/Alert';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://danjitalk.duckdns.org';
const IS_DEV =
  import.meta.env.VITE_NODE_ENV === 'development' ||
  window.location.hostname === 'localhost';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState<string | null>(null);

  // 비밀번호 유효성 검사
  // 영문, 숫자, 특수문자 포함 8~16자
  const validatePassword = (password: string): string | null => {
    if (password.length < 8 || password.length > 16) {
      return '비밀번호는 8~16자 이내여야 합니다.';
    }
    if (!/[A-Za-z]/.test(password)) {
      return '비밀번호는 영문자를 포함해야 합니다.';
    }
    if (!/[0-9]/.test(password)) {
      return '비밀번호는 숫자를 포함해야 합니다.';
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      return '비밀번호는 특수문자를 포함해야 합니다.';
    }
    return null;
  };

  // 비밀번호 확인 유효성 검사
  const validateConfirmPassword = (confirmPassword: string): string | null => {
    if (confirmPassword !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  // 비밀번호 재설정 처리
  const handleResetPassword = async () => {
    // 유효성 검사
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    const confirmPasswordValidationError =
      validateConfirmPassword(confirmPassword);
    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
      return;
    }

    try {
      const apiUrl = IS_DEV
        ? `${API_BASE_URL}/api/member/reset-password`
        : '/api/member/reset-password';

      await axios.post(
        apiUrl,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      // 성공 메시지 표시
      setAlertContent('비밀번호가 성공적으로 재설정되었습니다.');
      setShowAlert(true);

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('비밀번호 재설정 실패:', error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '비밀번호 재설정 중 오류가 발생했습니다.';
        setAlertContent(errorMessage);
      } else {
        setAlertContent('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.');
      }
      setShowAlert(true);
    }
  };

  return (
    <div className={styles['reset-password-wrapper']}>
      <div className={styles['reset-password-container']}>
        <h1 className={styles['sr-only']}>비밀번호 재설정</h1>
        <p className={styles['sr-only']}>새로운 비밀번호를 입력해주세요.</p>

        <form
          className={styles['reset-password-form']}
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}
        >
          {/* 인증한 이메일 정보 */}
          <InputField
            label="이메일"
            name="email"
            value={email}
            onChange={() => {}}
            disabled
            className={styles['input-field']}
            autoComplete="username"
          />
          <InputField
            label="새 비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(validatePassword(e.target.value));
              if (confirmPassword) {
                setConfirmPasswordError(
                  validateConfirmPassword(confirmPassword)
                );
              }
            }}
            placeholder="새 비밀번호를 입력하세요"
            required
            className={styles['input-field']}
            error={passwordError || undefined}
            showPasswordToggle={true}
            autoComplete="new-password"
          />

          <InputField
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError(validateConfirmPassword(e.target.value));
            }}
            placeholder="비밀번호를 다시 입력하세요"
            required
            className={styles['input-field']}
            error={confirmPasswordError || undefined}
            showPasswordToggle={true}
            autoComplete="new-password"
          />

          <div className={styles['button-container']}>
            <Button
              type="submit"
              label="다음"
              onClick={handleResetPassword}
              className={[
                styles['submit-button'],
                password && confirmPassword
                  ? styles['button-filled']
                  : styles['button-empty'],
              ]}
              disabled={!password || !confirmPassword}
            />
          </div>
        </form>

        {showAlert && (
          <Alert
            alertTitle="안내"
            alertContent={alertContent}
            onClose={() => setShowAlert(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
