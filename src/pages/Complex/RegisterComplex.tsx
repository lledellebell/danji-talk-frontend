import InputField from '../../components/common/InputField/InputField';
import Header from '../../layouts/Header';
import styles from './RegisterComplex.module.scss';
import { useState, useEffect, useRef } from 'react';

const RegisterComplex = () => {
  const [complexName, setComplexName] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [households, setHouseholds] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState('');
  const [dongInfo, setDongInfo] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDongSettingOpen, setIsDongSettingOpen] = useState(false);
  const [dongCount, setDongCount] = useState('');
  const [startDongNumber, setStartDongNumber] = useState('');
  const addressModalRef = useRef<HTMLDivElement>(null);
  
  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
  };
  
  useEffect(() => {
    if (isAddressModalOpen && addressModalRef.current) {
      new window.daum.Postcode({
        oncomplete: (data) => {
          setAddress(data.address);
          setIsAddressModalOpen(false);
        },
        width: '100%',
        height: '350px',
        embed: true,
        animation: true,
      }).embed(addressModalRef.current);
    }
  }, [isAddressModalOpen]);

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsAddressModalOpen(false);
    }
  };

  const handleDongSettingBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDongSettingOpen(false);
    }
  };

  const handleHouseholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const value = e.target.value.replace(/[^0-9]/g, '');
    setHouseholds(value);
  };
  
  const handleParkingSpacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용
    const value = e.target.value.replace(/[^0-9]/g, '');
    setParkingSpaces(value);
  };

  const handleDongCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setDongCount(value);
  };

  const handleStartDongNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setStartDongNumber(value);
  };

  const handleDongSettingOpen = () => {
    setIsDongSettingOpen(true);
  };

  const handleDongSettingCancel = () => {
    setIsDongSettingOpen(false);
  };

  const handleDongSettingComplete = () => {
    if (dongCount && startDongNumber) {
      const start = parseInt(startDongNumber);
      const count = parseInt(dongCount);
      if (count <= 0) {
        // 오류 처리
        return;
      }
      
      const dongNumbers = Array.from({ length: count }, (_, i) => start + i);
      setDongInfo(`${dongCount}개 동 (${dongNumbers.join(', ')}동)`);
    }
    setIsDongSettingOpen(false);
  };

  return (
    <>
      <Header title="단지 등록" type="sub" hasBackButton={true} />
      <div className={styles['register-complex__container']}>
        <form>
          <h2 className={styles['sr-only']}>단지 등록</h2>
          <div className={styles['register-complex__form-group']}>
            <InputField
              label="단지 이름"
              name="complexName"
              type="text"
              required
              value={complexName}
              placeholder="단지 이름을 입력해주세요"
              onChange={(e) => setComplexName(e.target.value)}
            />
            <div className={styles['register-complex__address-search']}>
              <InputField
                label="주소"
                name="address"
                type="text"
                required
                value={address}
                placeholder="주소를 입력해주세요"
                onChange={(e) => setAddress(e.target.value)}
              />
              <button 
                type="button" 
                className={styles['register-complex__address-search-button']}
                onClick={handleAddressSearch}
              >
                검색
              </button>
            </div>
            <InputField
              label="상세주소"
              lableClassName="sr-only"
              name="detailAddress"
              type="text"
              value={detailAddress}
              placeholder="상세주소를 입력해주세요"
              onChange={(e) => setDetailAddress(e.target.value)}
            />
            <InputField
              label="세대수"
              name="households"
              type="text"
              required
              value={households}
              placeholder="세대수를 입력해주세요(숫자만 입력)"
              onChange={handleHouseholdChange}
              inputMode="numeric"
            />
            <InputField
              label="주차 가능 대수"
              name="parkingSpaces"
              type="text"
              required
              value={parkingSpaces}
              placeholder="주차 가능 대수를 입력해주세요(숫자만 입력)"
              onChange={handleParkingSpacesChange}
              inputMode="numeric"
            />
            <div className={styles['register-complex__dong-setting']}>
              <InputField
                label="동 정보"
                name="dongInfo"
                type="text"
                required
                value={dongInfo}
                placeholder="동 정보를 설정해주세요"
                readOnly
                onChange={() => {}}
              />
              <button 
                type="button" 
                className={styles['register-complex__dong-setting-button']}
                onClick={handleDongSettingOpen}
              >
                설정
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {isAddressModalOpen && (
        <div 
          className={styles['register-complex__address-modal']}
          onClick={handleModalBackdropClick}
        >
          <div 
            ref={addressModalRef} 
            className={styles['register-complex__address-modal-content']}
          />
        </div>
      )}
      
      {isDongSettingOpen && (
        <div 
          className={styles['register-complex__dong-layer']}
          onClick={handleDongSettingBackdropClick}
        >
          <div className={styles['register-complex__dong-layer-content']}>
            <h3>동 설정</h3>
            <div className={styles['register-complex__dong-layer-form']}>
              <InputField
                label="동 수"
                name="dongCount"
                type="text"
                required
                value={dongCount}
                placeholder="동 수를 입력해주세요(숫자만 입력)"
                onChange={handleDongCountChange}
                inputMode="numeric"
              />
              <InputField
                label="시작 동 번호"
                name="startDongNumber"
                type="text"
                required
                value={startDongNumber}
                placeholder="시작 동 번호를 입력해주세요(숫자만 입력)"
                onChange={handleStartDongNumberChange}
                inputMode="numeric"
              />
              {/* TODO: 여기서부터 */}
              <div>
                <strong>예시</strong>
                <p>101~123</p>
              </div>
            </div>
            <div className={styles['register-complex__dong-layer-buttons']}>
              <button 
                type="button" 
                className={styles['register-complex__dong-layer-cancel']}
                onClick={handleDongSettingCancel}
              >
                취소
              </button>
              <button 
                type="button" 
                className={styles['register-complex__dong-layer-complete']}
                onClick={handleDongSettingComplete}
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterComplex; 