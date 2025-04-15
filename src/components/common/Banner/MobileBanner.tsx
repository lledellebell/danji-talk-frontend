import { useState, useEffect } from 'react';
import styles from './MobileBanner.module.scss';

interface MobileBannerProps {
  className?: string;
}

const MobileBanner: React.FC<MobileBannerProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // 로컬 스토리지에서 배너 상태 확인
  useEffect(() => {
    const bannerClosed = localStorage.getItem('mobileBannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('mobileBannerClosed', 'true');
  };

  const toggleInfo = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles['mobile-banner']} ${className || ''}`}>
      <div className={styles['mobile-banner__content']}>
        <div className={styles['mobile-banner__left']}>
          <div className={styles['mobile-banner__github-container']}>
            <span className={styles['mobile-banner__github-icon']}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.5 21.275 9.5 21.017V19.347C6.673 19.936 6.235 18.077 6.235 18.077C5.893 17.014 5.397 16.708 5.397 16.708C4.707 16.108 5.465 16.123 5.465 16.123C6.252 16.185 6.667 17.118 6.667 17.118C7.345 18.506 8.687 18.123 9.521 17.874C9.626 17.256 9.894 16.831 10.186 16.6C7.992 16.369 5.689 15.577 5.689 11.75C5.689 10.694 6 9.805 6.689 9.125C6.577 8.875 6.276 7.935 6.789 6.45C6.789 6.45 7.427 6.175 9.5 7.567C10.29 7.34 11.15 7.227 12 7.227C12.85 7.227 13.71 7.34 14.5 7.567C16.573 6.175 17.211 6.45 17.211 6.45C17.724 7.935 17.423 8.875 17.311 9.125C18 9.805 18.311 10.694 18.311 11.75C18.311 15.587 16.008 16.369 13.814 16.6C14.156 16.875 14.5 17.425 14.5 18.25V21.017C14.5 21.275 14.661 21.591 15.161 21.489C19.135 20.166 22 16.418 22 12C22 6.477 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <a
              href="https://github.com/DanjiTalk/danji-talk-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['mobile-banner__link']}
            >
              FE
            </a>
            /
            <a
              href="https://github.com/DanjiTalk/danji-talk-backend"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['mobile-banner__link']}
            >
              BE
            </a>
          </div>
        </div>

        <div className={styles['mobile-banner__right']}>
          <button
            className={styles['mobile-banner__button']}
            onClick={toggleInfo}
            aria-expanded={isExpanded}
          >
            서비스 소개
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <path
                d="M5 15L12 8L19 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={styles['mobile-banner__close']}
            onClick={handleClose}
            aria-label="배너 닫기"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${styles['mobile-banner__info-container']} ${isExpanded ? styles['mobile-banner__info-container--expanded'] : ''}`}
      >
        <div className={styles['mobile-banner__info']}>
          <p>
            <strong>단지톡(Danji Talk)</strong>은 아파트 주민들을 위한 소통
            플랫폼입니다. 이웃과 함께 정보를 공유하고, 커뮤니티 활동에
            참여해보세요.
          </p>
          <p>
            단지 내 공지사항, 동네 소식, 중고거래 등 다양한 기능을 제공합니다.
            더 나은 아파트 생활을 위한 첫걸음, 단지톡과 함께하세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileBanner;
