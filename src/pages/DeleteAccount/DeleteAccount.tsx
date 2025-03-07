import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import InputField from '../../components/common/InputField/InputField';
import './DeleteAccountInfo.scss';
import './DeleteAccountPassword.scss';

const DeleteAccountInfo = () => {
  return (
    <div className="delete-account-info">
      <div className="delete-account-info__center">
        <p className="delete-account-info__title">잠시만요!</p>
        <p className="delete-account-info__description">
          회원 탈퇴 전 아래 정보를 확인해주세요
        </p>
      </div>
      <div className="delete-account-info__section">
        <p className="delete-account-info__section-title">
          개인 이용 내역 삭제
        </p>
        <p className="delete-account-info__description">
          탈퇴 시 회원님의 정보는 모두 사라집니다.
          <br />
          단지톡을 다시 이용하고자 할 경우 회원가입을 다시 해 주셔야합니다.
        </p>
      </div>
      <div className="delete-account-info__section">
        <p className="delete-account-info__section-title">
          예약 내역 보유 시 탈퇴 불가
        </p>
        <p className="delete-account-info__description">
          회원님의 예약 내역이 존재하고, 아직 예약일이 지나지않았을 경우 탈퇴가
          불가합니다. 예약 내역 삭제 후 진행해주세요.
        </p>
      </div>
      <Button
        active
        as="button"
        className="danger"
        label="확인했어요."
        onClick={() => {}}
        size="large"
      />
    </div>
  );
};

const DeleteAccountPassword = () => {
  const [password, setPassword] = useState('');

  return (
    <div className="delete-account-password">
      <div className="delete-account-password__center">
        <div className="delete-account-password__header">
          <p className="delete-account-password__title">탈퇴를 진행합니다.</p>
          <p className="delete-account-password__subtitle">
            회원님의 비밀번호를 입력해주세요
          </p>
        </div>
      </div>
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={16}
        placeholder="비밀번호를 입력해주세요"
        required
        autoComplete="password"
        showPasswordToggle
        className="delete-account-password__input"
      />
      <Button
        as="button"
        className={`delete-account-password__button ${
          password ? '' : 'delete-account-password__button--disabled'
        }`}
        disabled={!password}
        label="탈퇴"
        onClick={() => {}}
        size="large"
      />
    </div>
  );
};

export const DeleteAccount = () => {
  return (
    <div>
      <DeleteAccountInfo />
      <DeleteAccountPassword />
    </div>
  );
};
