import search from '../assets/home/search.svg';
import complexInfo from '../assets/home/complexInfo.svg';
import community from '../assets/home/community.svg';
import notice from '../assets/home/notice.svg';
import facilityInfo from '../assets/home/facilityInfo.svg';
import myPage from '../assets/home/myPage.svg';
import favorites from '../assets/home/favorites.svg';
import chat from '../assets/home/chat.svg';
import visitorVehicle from '../assets/home/visitorVehicle.svg';
import styles from './HomePage.module.scss';

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

const SearchBar = () => {
  return (
    <div className={styles.inputContainer}>
      <input type="text" placeholder={'궁금한 단지를 검색해보세요!'} />
      <img src={search} alt="검색 아이콘" className={styles.searchIcon} />
    </div>
  );
};
export const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <div className={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <img src={item.src} alt={item.label} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
