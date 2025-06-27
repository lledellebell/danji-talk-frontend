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
  { src: complexInfo, label: '단지정보' },
  { src: community, label: '커뮤니티' },
  { src: notice, label: '공지사항' },
  { src: facilityInfo, label: '시설정보' },
  { src: myPage, label: '마이페이지' },
  { src: favorites, label: '즐겨찾기' },
  { src: chat, label: '채팅' },
  { src: visitorVehicle, label: '방문차량등록' },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (keyword: string) => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <>
      <Header title="DANJITALK" type="main" />
      <HomeSearchBar onSearch={handleSearch} />
      <div className={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <img src={item.src} alt={item.label} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;