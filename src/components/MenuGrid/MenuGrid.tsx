import { Link } from 'react-router-dom';
import styles from './MenuGrid.module.scss';
import ComplexInfoIcon from '../../assets/menugrid/Chart.svg';
import CommunityIcon from '../../assets/menugrid/Gamepad.svg';
import NoticesIcon from '../../assets/menugrid/Danger.svg';
import FacilitiesIcon from '../../assets/menugrid/Graph.svg';
import MypageIcon from '../../assets/menugrid/User.svg';
import FavoritesIcon from '../../assets/menugrid/Star.svg';
import ChatIcon from '../../assets/menugrid/Message.svg';
import VisitorCarIcon from '../../assets/menugrid/Receipt.svg';

const menuItems = [
  { icon: <img className={styles.icon} src={ComplexInfoIcon} alt="단지정보" />, label: '단지정보', path: '/complex-info' },
  { icon: <img className={styles.icon} src={CommunityIcon} alt="커뮤니티" />, label: '커뮤니티', path: '/community' },
  { icon: <img className={styles.icon} src={NoticesIcon} alt="공지사항" />, label: '공지사항', path: '/notices' },
  { icon: <img className={styles.icon} src={FacilitiesIcon} alt="시설정보" />, label: '시설정보', path: '/facilities' },
  { icon: <img className={styles.icon} src={MypageIcon} alt="마이페이지" />, label: '마이페이지', path: '/mypage' },
  { icon: <img className={styles.icon} src={FavoritesIcon} alt="즐겨찾기" />, label: '즐겨찾기', path: '/favorites' },
  { icon: <img className={styles.icon} src={ChatIcon} alt="채팅" />, label: '채팅', path: '/chat' },
  { icon: <img className={styles.icon} src={VisitorCarIcon} alt="방문차량" />, label: '방문차량', path: '/visitor-car' },
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
          {item.icon}
          <span className={styles.label}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MenuGrid; 