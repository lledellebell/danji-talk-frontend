import InputField from '../../components/common/InputField/InputField';
import Header from '../../layouts/Header';
import styles from './RegisterComplex.module.scss';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplexStore } from '../../stores/complexStore';

const toggleScrollLock = (lock: boolean) => {
  const isPc = window.innerWidth >= 1024;
  
  if (isPc) {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      if (lock) {
        appContainer.classList.add('body-no-scroll');
      } else {
        appContainer.classList.remove('body-no-scroll');
      }
    }
  } else {
    if (lock) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
  }
};

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
  const [previewDongInfo, setPreviewDongInfo] = useState('');
  const addressModalRef = useRef<HTMLDivElement>(null);
  const [complexImages, setComplexImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { registerComplex, isLoading: isStoreLoading, error: storeError } = useComplexStore();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleAddressSearch = () => {
    setIsAddressModalOpen(true);
    toggleScrollLock(true);
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
      toggleScrollLock(false);
    }
  };

  const handleDongSettingBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDongSettingOpen(false);
      toggleScrollLock(false);
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
    toggleScrollLock(true);
  };

  const handleDongSettingCancel = () => {
    setIsDongSettingOpen(false);
    toggleScrollLock(false);
  };

  const handleDongSettingComplete = () => {
    if (dongCount && startDongNumber) {
      const start = parseInt(startDongNumber);
      const count = parseInt(dongCount);
      if (count <= 0) {
        return;
      }
      
      // 서버에서 기대하는 형식으로 변경
      const end = start + count - 1;
      // "101동 ~ 123동 (23개동)" 형식으로 설정
      setDongInfo(`${start}동 ~ ${end}동 (${count}개동)`);
    }
    setIsDongSettingOpen(false);
    toggleScrollLock(false);
  };

  useEffect(() => {
    if (dongCount && startDongNumber) {
      const start = parseInt(startDongNumber);
      const count = parseInt(dongCount);
      if (count > 0) {
        const end = start + count - 1;
        setPreviewDongInfo(`${start}동 ~ ${end}동 (총 ${count}개 동)`);
      }
    } else {
      setPreviewDongInfo('');
    }
  }, [dongCount, startDongNumber]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // 최대 10개 파일로 제한
      const totalFiles = [...complexImages, ...newFiles];
      if (totalFiles.length > 10) {
        alert('최대 10개의 이미지만 업로드할 수 있습니다.');
        return;
      }
      
      const validFiles = newFiles.filter(file => 
        file.type.startsWith('image/')
      );
      
      if (validFiles.length !== newFiles.length) {
        alert('이미지 파일만 업로드할 수 있습니다.');
      }
      
      validFiles.forEach(file => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        
        img.onload = () => {
          console.log(`원본 이미지 크기: ${img.width}x${img.height}`);
          URL.revokeObjectURL(objectUrl);
        };
        
        img.src = objectUrl;
      });
      
      setComplexImages(prev => [...prev, ...validFiles]);
      
      const newImageUrls = validFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newImageUrls]);
    }
    
    // 파일 input 초기화 (같은 파일 재선택 가능하게)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleImageDelete = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setComplexImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 입력값 검증
    if (!complexName || !address || !households || !parkingSpaces || !dongInfo) {
      setError('필수 입력 항목을 모두 입력해주세요.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const formData = new FormData();
      
      const requestDto = {
        name: complexName,
        region: address,
        location: detailAddress,
        totalUnit: parseInt(households),
        parkingCapacity: parseInt(parkingSpaces),
        buildingRange: dongInfo
      };
      
      // JSON 문자열로 변환하여 FormData에 추가
      formData.append('requestDto', new Blob([JSON.stringify(requestDto)], { 
        type: 'application/json' 
      }), 'requestDto.json');
      
      // 반드시 'multipartFileList' 필드명 사용
      complexImages.forEach(file => {
        formData.append('multipartFileList', file);
      });
      
      const success = await registerComplex(formData);
      
      if (success) {
        navigate('/'); 
      } else {
        setError(storeError || '단지 등록 중 오류가 발생했습니다.');
      }

      console.log('제출할 데이터:', {
        name: complexName,
        region: address,
        location: detailAddress,
        totalUnit: parseInt(households),
        parkingCapacity: parseInt(parkingSpaces),
        buildingRange: dongInfo
      });
    } catch (err) {
      console.error('단지 등록 실패:', err);
      setError('단지 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = complexName && address && households && parkingSpaces && dongInfo;

  const isSubmittingAny = isSubmitting || isStoreLoading;

  useEffect(() => {
    return () => {
      document.body.classList.remove('body-no-scroll');
      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        appContainer.classList.remove('body-no-scroll');
      }
    };
  }, []);

  return (
    <>
      <Header title="단지 등록" type="sub" hasBackButton={true} />
      <div className={styles['register-complex__container']}>
        <form onSubmit={handleSubmit}>
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
            <div className={styles['register-complex__image-container']}>
              <div className={styles['register-complex__image-header']}>
                <label className={styles['register-complex__image-label']}>
                  단지 이미지
                </label>
                <span className={styles['register-complex__image-info']}>
                  * 최대 10장의 이미지 첨부가 가능합니다.
                </span>
              </div>
              
              <div className={styles['register-complex__image-scroll-container']}>
                <div className={styles['register-complex__image-scroll']}>
                  {imagePreviewUrls.length < 10 && (
                    <button
                      type="button"
                      className={styles['register-complex__image-upload']}
                      onClick={handleImageUploadClick}
                      aria-label="이미지 업로드"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M19 8V2M16 5H22M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  
                  {/* 업로드된 이미지들 */}
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className={styles['register-complex__image-item']}>
                      <img 
                        src={url} 
                        alt={`단지 이미지 ${index + 1}`} 
                        className={styles['register-complex__image-preview']}
                      />
                      <button
                        type="button"
                        className={styles['register-complex__image-delete']}
                        onClick={() => handleImageDelete(index)}
                        aria-label="이미지 삭제"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <span className={styles['register-complex__image-size-info']}>
                * 권장 이미지 크기: 390 x 460 픽셀
              </span>
              
              <input
                type="file"
                ref={fileInputRef}
                className={styles['register-complex__image-input']}
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                aria-label="단지 이미지 업로드"
              />
            </div>

            <div className={styles['register-complex__submit-container']}>
              {error && <p className={styles['register-complex__error-message']}>{error}</p>}
              <button 
                type="submit" 
                className={styles['register-complex__submit-button']}
                disabled={isSubmittingAny || !isFormValid}
              >
                {isSubmittingAny ? '등록 중...' : '등록하기'}
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
            </div>
            <div className={styles['register-complex__dong-layer-preview']}>
              <strong>미리보기</strong>
              <div className={styles['register-complex__dong-layer-preview-content']}>
                {previewDongInfo || '동 수와 시작 동 번호를 입력하면 미리보기가 표시됩니다'}
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