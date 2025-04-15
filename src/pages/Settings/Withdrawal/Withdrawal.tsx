import { useState } from 'react';
import { useWithdrawalStore } from '../../../stores/withdrawalStore';
import { useWithdrawalMutation } from '../../../hooks/useWithdrawal';
import styles from './Withdrawal.module.scss';
import InputField from '../../../components/common/InputField/InputField';

const PasswordConfirmationStep = () => {
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState(false);
  const { error } = useWithdrawalStore();
  const withdrawal = useWithdrawalMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    withdrawal.mutate(password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles['withdrawal__form']}
      aria-labelledby="withdrawal-form-title"
    >
      <header className={styles['withdrawal__warning']}>
        <h1
          id="withdrawal-form-title"
          className={styles['withdrawal__warning-title']}
        >
          탈퇴를 진행합니다.
        </h1>
        <p className={styles['withdrawal__warning-text']}>
          회원님의 정보 보호를 위해
          <br />
          <strong>비밀번호를 한 번 더 확인</strong>합니다.
          <br />
          <strong className={styles['withdrawal__warning-text--danger']}>
            탈퇴 후에는 복구가 불가능
          </strong>
          하니 신중하게 진행해 주세요.
        </p>
      </header>

      <div
        className={`${styles['withdrawal__input-wrapper']} ${focused ? styles['withdrawal__input-wrapper--focused'] : ''}`}
        role="group"
        aria-labelledby="password-label"
      >
        <InputField
          id="password"
          name="password"
          type="password"
          label="비밀번호 확인"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="비밀번호를 입력해주세요"
          required
          error={error ?? undefined}
          showPasswordToggle={true}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'password-error' : undefined}
          disabled={withdrawal.isPending}
        />
      </div>
    </form>
  );
};

const Withdrawal = () => {
  const { step, setStep } = useWithdrawalStore();
  const withdrawal = useWithdrawalMutation();

  return (
    <div className={styles['withdrawal__container']}>
      <div className={styles['withdrawal__main-wrapper']}>
        {step === 1 ? (
          <>
            <section
              className={styles['withdrawal__warning']}
              aria-labelledby="warning-title"
            >
              <h1
                id="warning-title"
                className={styles['withdrawal__warning-title']}
              >
                잠시만요!
              </h1>
              <p className={styles['withdrawal__warning-text']}>
                회원 탈퇴 전 꼭 확인해주세요.
              </p>
            </section>

            <section
              className={styles['withdrawal__warning-list']}
              aria-label="회원 탈퇴 주의사항"
            >
              <article className={styles['withdrawal__warning-item']}>
                <h2>개인 이용 내역 삭제</h2>
                <p className={styles['withdrawal__warning-item-text']}>
                  탈퇴 시 회원님의 정보는 모두 사라집니다.
                  <br />
                  단지톡을 다시 이용하고자 할 경우 회원가입을 다시해주셔야
                  합니다.
                </p>
              </article>
              <article className={styles['withdrawal__warning-item']}>
                <h2>예약내역 보유시 탈퇴 불가</h2>
                <p className={styles['withdrawal__warning-item-text']}>
                  회원님의 예약 내역이 존재하고, 아직 예약일이 지나지 않았을
                  경우 탈퇴가 불가능합니다. 예약 내역을 삭제 후 진행해주세요.
                </p>
              </article>
            </section>
          </>
        ) : (
          <PasswordConfirmationStep />
        )}
      </div>

      <div className={styles['withdrawal__button-wrapper']}>
        {step === 1 ? (
          <button
            className={styles['withdrawal__confirm-button']}
            onClick={() => setStep(2)}
          >
            확인했어요
          </button>
        ) : (
          <button
            className={styles['withdrawal__confirm-button']}
            onClick={() => {
              const form = document.querySelector('form');
              if (form)
                form.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true })
                );
            }}
            disabled={withdrawal.isPending}
          >
            {withdrawal.isPending ? '처리중...' : '회원 탈퇴'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Withdrawal;
