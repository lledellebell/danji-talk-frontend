import styles from './MyPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { useAuthStore } from '../../stores/authStore';
import { apiClient } from '../../api/client';
import { AxiosError } from 'axios';
import Toast from '../../components/common/Toast/Toast';

import WriteIcon from '../../assets/mypage/Write.svg';
import BookmarkIcon from '../../assets/mypage/Bookmark.svg';
import MailIcon from '../../assets/mypage/Mail.svg';
import BrowserIcon from '../../assets/mypage/Browser.svg';
import EditIcon from '../../assets/mypage/Edit.svg';

import LogoIcon from '../../assets/logo.svg';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  return (
    <li className={styles['nav__item']}>
      <Link to={to} className={styles['nav__link']}>
        {icon}
        <span className={styles['nav__label']}>{label}</span>
      </Link>
    </li>
  );
};

const NavIconList: React.FC = () => {
  const navItems = [
    {
      icon: (
        <img className={styles['nav__icon']} src={WriteIcon} alt="작성한 글" />
      ),
      label: '작성한 글',
      to: '/mypage/posts',
    },
    {
      icon: (
        <img
          className={styles['nav__icon']}
          src={BookmarkIcon}
          alt="스크랩한 글"
        />
      ),
      label: '스크랩한 글',
      to: '/mypage/scraps',
    },
    {
      icon: (
        <img className={styles['nav__icon']} src={MailIcon} alt="채팅방 목록" />
      ),
      label: '채팅방 목록',
      to: '/mypage/chats',
    },
    {
      icon: (
        <img
          className={styles['nav__icon']}
          src={BrowserIcon}
          alt="방문차량 목록"
        />
      ),
      label: '방문차량 목록',
      to: '/mypage/vehicles',
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles['nav__list']}>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            to={item.to}
          />
        ))}
      </ul>
    </nav>
  );
};

interface ProfileImageProps {
  imageUrl: string;
  userName: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, userName }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string): string => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles['profile__image-wrapper']}>
      {!imageUrl || imageError ? (
        <div className={styles['profile__image-placeholder']}>
          {getInitials(userName)}
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="프로필 이미지"
          className={styles['profile__image-img']}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

const ProfileSection: React.FC = () => {
  const navigate = useNavigate();
  const { userEmail } = useUserStore();
  const { isLoggedIn } = useAuthStore();
  const [userData, setUserData] = useState({
    fileId: '',
    name: '사용자',
    nickname: '',
    email: '',
    phoneNumber: '',
    apartmentName: '',
    building: '',
    unit: '',
    location: '',
    region: '',
    moveInDate: '',
    numberOfResidents: '',
    carNumbers: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get('/member');
        const userData = response.data.data;
        setUserData({
          fileId: userData.fileId || '',
          name: userData.name || '사용자',
          nickname: userData.nickname || '',
          email: userData.email || userEmail || 'example@email.com',
          phoneNumber: userData.phoneNumber || '',
          apartmentName: userData.apartmentName || '',
          building: userData.building || '',
          unit: userData.unit || '',
          location: userData.location || '',
          region: userData.region || '',
          moveInDate: userData.moveInDate || '',
          numberOfResidents: userData.numberOfResidents || '',
          carNumbers: userData.carNumbers || '',
        });
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류 발생:', error);
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            navigate('/login');
          } else {
            setError(
              error.response?.data?.message ||
                '프로필 정보를 가져오는데 실패했습니다.'
            );
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn, userEmail, navigate]);

  const handleEditProfile = () => {
    setShowToast(true);
  };

  const handleApartmentInfoClick = () => {
    setShowToast(true);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={styles['profile']}>
      <h1 className={styles['sr-only']}>마이페이지</h1>
      <div className={styles['profile__user-card']}>
        <div className={styles['profile__image-container']}>
          <ProfileImage
            imageUrl={userData.fileId ? `/api/files/${userData.fileId}` : ''}
            userName={userData.name}
          />
          <button
            className={styles['profile__edit-button']}
            onClick={handleEditProfile}
          >
            <img src={EditIcon} alt="수정하기" />
          </button>
        </div>
        <div className={styles['profile__user-info-wrapper']}>
          <div className={styles['profile__user-info-container']}>
            <div className={styles['profile__user-info']}>
              <span className={styles['profile__username']}>
                {userData.name}
                {userData.nickname && `(${userData.nickname})`}
              </span>
              <span className={styles['profile__email']}>
                {userData.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['profile__apartment-section']}>
        <h2>등록된 단지 정보</h2>
        <div className={styles['profile__apartment-list']}>
          {userData.apartmentName ? (
            <div
              className={styles['profile__apartment-item']}
              onClick={handleApartmentInfoClick}
            >
              <img src={LogoIcon} alt="아파트 로고" />
              <span>{userData.apartmentName}</span>
            </div>
          ) : (
            <div className={styles['profile__no-apartment']}>
              등록된 단지 정보가 없습니다.
            </div>
          )}
        </div>
      </div>
      <Toast
        isVisible={showToast}
        message="준비 중인 기능입니다."
        onClose={() => setShowToast(false)}
      />
    </section>
  );
};

const MyPage = () => {
  return (
    <div className={styles['my-page']}>
      <h1 className={styles['sr-only']}>마이페이지</h1>
      <ProfileSection />
      <NavIconList />
    </div>
  );
};

export default MyPage;
