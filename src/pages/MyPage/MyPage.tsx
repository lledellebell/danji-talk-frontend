import styles from './MyPage.module.scss';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import WriteIcon from '../../assets/mypage/Write.svg';
import BookmarkIcon from '../../assets/mypage/Bookmark.svg';
import MailIcon from '../../assets/mypage/Mail.svg';
import BrowserIcon from '../../assets/mypage/Browser.svg';

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

const MyPage = () => {
  return (
    <div className={styles['my-page']}>
      <h1 className={styles['my-page__title']}>마이페이지</h1>
      <NavIconList />
      <Outlet />
    </div>
  );
};

export default MyPage; 