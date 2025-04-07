import styles from './MyPage.module.scss';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';

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

const ProfileSection: React.FC = () => {
  const navigate = useNavigate();
  const { userEmail } = useUserStore();
  
  const handleEditProfile = () => {
    navigate('/settings/profile');
  };
  
  return (
    <div className={styles['profile']}>
      <div className={styles['profile__info']}>
        <div className={styles['profile__image-container']}>
          <div className={styles['profile__image']}>
            <img 
              src="https://placehold.co/100" 
              width={100}
              height={100}
              alt="프로필 이미지"
              className={styles['profile__image-img']} 
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
          <span className={styles['profile__name']}>사용자</span>
          <span className={styles['profile__email']}>{userEmail || 'example@email.com'}</span>
        </div>
      </div>
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