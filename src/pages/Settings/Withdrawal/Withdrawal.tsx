import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import styles from './Withdrawal.module.scss';

const Withdrawal = () => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/member`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원탈퇴 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <main className={styles.withdrawal}>
        <div className={styles.content}>
          <section className={styles.warning} aria-labelledby="warning-title">
            <h1 id="warning-title" className={styles.warningTitle}>잠시만요!</h1>
            <p className={styles.warningText}>회원 탈퇴 전 꼭 확인해주세요.</p>
          </section>

          <section className={styles.warningList} aria-label="회원 탈퇴 주의사항">
            <article className={styles.warningItem}>
              <h2>개인 이용 내역 삭제</h2>
              <p className={styles.warningItemText}>
                탈퇴 시 회원님의 정보는 모두 사라집니다.
                <br />
                단지톡을 다시 이용하고자 할 경우 회원가입을 다시해주셔야 합니다.
              </p>
            </article>
            <article className={styles.warningItem}>
              <h2>예약내역 보유시 탈퇴 불가</h2>
              <p className={styles.warningItemText}>
                회원님의 예약 내역이 존재하고, 아직 예약일이 지나지 않았을 경우 탈퇴가 불가능합니다. 
                예약 내역을 삭제 후 진행해주세요.
              </p>
            </article>
          </section>

          <button
            type="button"
            className={styles.confirmButton}
            onClick={() => setStep(2)}
            aria-label="회원 탈퇴 확인"
          >
            탈퇴하기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.withdrawal}>
      <div className={styles.content}>
        <form 
          onSubmit={handleWithdrawal} 
          className={styles.form}
          aria-labelledby="withdrawal-form-title"
        >
          <h1 id="withdrawal-form-title" className="sr-only">회원 탈퇴 비밀번호 확인</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호 확인
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className={styles.input}
              required
              aria-required="true"
              aria-describedby={error ? "password-error" : undefined}
            />
            {error && (
              <p id="password-error" className={styles.error} role="alert">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!password || isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? '처리중...' : '회원 탈퇴'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Withdrawal; 