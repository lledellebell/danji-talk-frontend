import { Link } from 'react-router-dom';
import styles from './MenuGrid.module.scss';

const menuItems = [
  { icon: '..', label: '단지정보', path: '/complex-info' },
  { icon: '..', label: '커뮤니티', path: '/community' },
  { icon: '..', label: '공지사항', path: '/notices' },
  { icon: '..', label: '시설정보', path: '/facilities' },
  { icon: '..', label: '마이페이지', path: '/mypage' },
  { icon: '..', label: '즐겨찾기', path: '/favorites' },
  { icon: '..', label: '채팅', path: '/chat' },
  { icon: '..', label: '방문차량', path: '/visitor-car' },
];

const MenuGrid = () => {
  return (
    <div className={styles.menuGrid}>
      {menuItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path}
          className={styles.menuItem}
          aria-label={item.label}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MenuGrid; 