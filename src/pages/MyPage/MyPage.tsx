import styles from './MyPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { useAuthStore } from '../../stores/authStore';
import api from '../../api/axios';
import axios from 'axios';

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

  if (!imageUrl || imageError) {
    return (
      <div className={styles['profile__image-placeholder']}>
        {getInitials(userName)}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      width={100}
      height={100}
      alt="프로필 이미지"
      className={styles['profile__image-img']}
      onError={handleImageError}
    />
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

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/member');
        setUserData({
          fileId: response.data.data.fileId || '',
          name: response.data.data.name || '사용자',
          nickname: response.data.data.nickname || '',
          email: response.data.data.email || userEmail || 'example@email.com',
          phoneNumber: response.data.data.phoneNumber || '',
          apartmentName: response.data.data.apartmentName || '',
          building: response.data.data.building || '',
          unit: response.data.data.unit || '',
          location: response.data.data.location || '',
          region: response.data.data.region || '',
          moveInDate: response.data.data.moveInDate || '',
          numberOfResidents: response.data.data.numberOfResidents || '',
          carNumbers: response.data.data.carNumbers || '',
        });
      } catch (error) {
        console.error('프로필 정보를 가져오는 중 오류 발생:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            navigate('/login');
          } else if (error.response?.status === 500) {
            console.error('서버 응답 데이터:', error.response.data);
            setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          } else {
            setError('프로필 정보를 가져오는데 실패했습니다.');
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
    navigate('/settings/profile');
  };

  return (
    <div className={styles['profile']}>
      {isLoading ? (
        <div className={styles['profile__loading']}>
          프로필 정보를 불러오는 중...
        </div>
      ) : error ? (
        <div className={styles['profile__error']}>{error}</div>
      ) : (
        <div className={styles['profile__info']}>
          <div className={styles['profile__image-container']}>
            <div className={styles['profile__image']}>
              <ProfileImage
                imageUrl={userData.fileId ? `/api/files/${userData.fileId}` : ''}
                userName={userData.name}
              />
            </div>
            <button
              className={styles['profile__edit-button']}
              onClick={handleEditProfile}
              aria-label="프로필 수정"
            >
              <img width={12} height={12} src={EditIcon} alt="프로필 수정" />
            </button>
          </div>
          <div className={styles['profile__details']}>
            <span className={styles['profile__name']}>
              {userData.nickname || userData.name}
            </span>
            <span className={styles['profile__email']}>{userData.email}</span>
          </div>

          {/* 등록된 단지 정보 : 단지 정보가 없는 경우 */}
          {
            !userData.apartmentName && (
              <div className={styles['profile__apartment-info-container']}>
                <div className={styles['profile__apartment-info']}>
                  {/* app icon */}
                  <img
                    src={LogoIcon}
                    alt="단지 정보"
                    width={50}
                    height={50}
                    className={styles['profile__apartment-icon']}
                  />
                  <span className={styles['profile__apartment-name']}>
                    단지 정보가 없습니다.
                  </span>
                </div>

                <button 
                  className={styles['profile__apartment-button']}
                  onClick={() => navigate('/register-complex')}
                >
                  단지 등록하기
                </button>
              </div>
            )
          }
          {/* 등록된 단지 정보: 단지 정보가 있는 경우 */}
          {
            userData.apartmentName && (
              <div className={styles['profile__apartment-info']}>
                {/* app icon */}
              </div>
            )
          }
        </div>
      )}
    </div>
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
