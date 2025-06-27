import { useNavigate } from 'react-router-dom';
import complexInfo from '../../assets/home/complexInfo.svg';
import community from '../../assets/home/community.svg';
import notice from '../../assets/home/notice.svg';
import facilityInfo from '../../assets/home/facilityInfo.svg';
import myPage from '../../assets/home/myPage.svg';
import favorites from '../../assets/home/favorites.svg';
import chat from '../../assets/home/chat.svg';
import visitorVehicle from '../../assets/home/visitorVehicle.svg';
import styles from './HomePage.module.scss';
import HomeSearchBar from '../../components/Search/HomeSearchBar';
import Header from '../../layouts/Header';

const menuItems = [
  { src: complexInfo, label: '단지정보', path: '/complex-info' },
  { src: community, label: '커뮤니티', path: '/community' },
  { src: notice, label: '공지사항', path: '/notices' },
  { src: facilityInfo, label: '시설정보', path: '/facilities' },
  { src: myPage, label: '마이페이지', path: '/mypage' },
  { src: favorites, label: '즐겨찾기', path: '/favorites' },
  { src: chat, label: '채팅', path: '/chat' },
  { src: visitorVehicle, label: '방문차량등록', path: '/visitor-car' },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (keyword: string) => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Header title="DANJITALK" type="main" />
      <HomeSearchBar onSearch={handleSearch} />
      <div className={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <button 
            key={index} 
            className={styles.menuItem}
            onClick={() => handleMenuItemClick(item.path)}
            type="button"
            aria-label={`${item.label} 페이지로 이동`}
          >
            <img src={item.src} alt="" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default HomePage;