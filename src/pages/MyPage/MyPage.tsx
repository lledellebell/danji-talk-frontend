import styles from './MyPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { useAuthStore } from '../../stores/authStore';
import axios from 'axios';

import WriteIcon from '../../assets/mypage/Write.svg';
import BookmarkIcon from '../../assets/mypage/Bookmark.svg';
import MailIcon from '../../assets/mypage/Mail.svg';
import BrowserIcon from '../../assets/mypage/Browser.svg';
import EditIcon from '../../assets/mypage/Edit.svg';

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
    { icon: <img className={styles['nav__icon']} src={WriteIcon} alt="작성한 글" />, label: '작성한 글', to: '/mypage/posts' },
    { icon: <img className={styles['nav__icon']} src={BookmarkIcon} alt="스크랩한 글" />, label: '스크랩한 글', to: '/mypage/scraps' },
    { icon: <img className={styles['nav__icon']} src={MailIcon} alt="채팅방 목록" />, label: '채팅방 목록', to: '/mypage/chats' },
    { icon: <img className={styles['nav__icon']} src={BrowserIcon} alt="방문차량 목록" />, label: '방문차량 목록', to: '/mypage/vehicles' },
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
    profileImage: '',
    name: '사용자',
    nickname: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserProfile = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          // TODO: 사용자 프로필 정보를 가져오는 API 엔드포인트 호출
          const response = await axios.get('/api/member/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (response.data) {
            setUserData({
              profileImage: response.data.profileImage || '',
              name: response.data.name || '사용자',
              nickname: response.data.nickname || '',
              email: response.data.email || userEmail || 'example@email.com'
            });
          }
        } catch (err) {
          console.error('프로필 정보를 가져오는 중 오류 발생:', err);
          setError('프로필 정보를 가져오지 못했습니다.');
          
          setUserData({
            profileImage: '',
            name: '사용자',
            nickname: '',
            email: userEmail || 'example@email.com'
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUserProfile();
    }
  }, [isLoggedIn, userEmail]);
  
  const handleEditProfile = () => {
    navigate('/settings/profile');
  };
  
  return (
    <div className={styles['profile']}>
      {isLoading ? (
        <div className={styles['profile__loading']}>프로필 정보를 불러오는 중...</div>
      ) : error ? (
        <div className={styles['profile__error']}>{error}</div>
      ) : (
        <div className={styles['profile__info']}>
          <div className={styles['profile__image-container']}>
            <div className={styles['profile__image']}>
              <ProfileImage 
                imageUrl={userData.profileImage} 
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
            <span className={styles['profile__name']}>{userData.nickname || userData.name}</span>
            <span className={styles['profile__email']}>{userData.email}</span>
          </div>
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
      <Outlet />
    </div>
  );
};

export default MyPage; 