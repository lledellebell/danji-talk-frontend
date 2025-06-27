import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import Toast from '../../components/common/Toast/Toast';
import { newApartments, trendingApartments } from '../../data/apartments';

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
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleSearch = (keyword: string) => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const handleApartmentClick = (apartmentId: number) => {
    navigate(`/complex/${apartmentId}`);
  };

  const extractBuildingCount = (buildingRange: string) => {
    const match = buildingRange.match(/\((\d+)개동\)/);
    return match ? match[1] : '0';
  };

  const handleFavoriteToggle = (apartmentId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavoriteStates(prev => ({
      ...prev,
      [apartmentId]: !prev[apartmentId]
    }));
    
    // 토스트 메시지 표시
    setToastMessage('즐겨찾기 기능은 현재 개발 중입니다. 곧 만나보실 수 있어요!');
    setIsToastVisible(true);
  };

  const handleToastClose = () => {
    setIsToastVisible(false);
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
      
      {/* 신축아파트 분양정보 섹션 */}
      <div className={`${styles['apartment-section']} ${styles['new-apartment-section']}`}>
        <h2 className={styles['apartment-section__title']}>신축아파트 분양정보</h2>
        <div className={styles['apartment-section__list']}>
          {newApartments.map((apartment) => (
            <div 
              key={apartment.id} 
              className={styles['apartment-section__card']}
              onClick={() => handleApartmentClick(apartment.id)}
            >
              <div className={styles['apartment-section__image']}>
                <img 
                  src={apartment.imageUrl} 
                  alt={apartment.name}
                />
                <div className={styles['apartment-section__location']}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF97B1"/>
                  </svg>
                  {apartment.region}
                </div>
              </div>
              <div className={styles['apartment-section__info']}>
                <div className={styles['apartment-section__name']}>{apartment.name}</div>
                <div className={styles['apartment-section__details']}>
                  {apartment.totalUnit}세대 | 총 {extractBuildingCount(apartment.buildingRange)}동 | {apartment.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 요즘 뜨는 아파트 섹션 */}
      <div className={`${styles['apartment-section']} ${styles['trending-apartment-section']}`}>
        <h2 className={styles['apartment-section__title']}>요즘 뜨는 아파트</h2>
        <div className={styles['apartment-section__list']}>
          {trendingApartments.map((apartment) => (
            <div 
              key={apartment.id} 
              className={styles['apartment-section__card']}
              onClick={() => handleApartmentClick(apartment.id)}
            >
              <div className={styles['apartment-section__image']}>
                <img 
                  src={apartment.imageUrl} 
                  alt={apartment.name}
                />
                <div className={styles['apartment-section__location']}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF97B1"/>
                  </svg>
                  {apartment.region}
                </div>
                <button
                  type="button"
                  onClick={(e) => handleFavoriteToggle(apartment.id, e)}
                  className={styles['apartment-section__favorite-button']}
                  aria-label="즐겨찾기"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.62L10 0L7.19 6.62L0 7.24L5.46 11.97L3.82 19L10 15.27Z" 
                      fill={favoriteStates[apartment.id] ? "#ffb700" : "rgba(255,255,255,0.6)"} 
                      strokeWidth={favoriteStates[apartment.id] ? "1" : "1"}
                      stroke={favoriteStates[apartment.id] ? "#ffb700" : "#C0C0C0"}
                    />
                  </svg>
                </button>
              </div>
              <div className={styles['apartment-section__info']}>
                <div className={styles['apartment-section__name']}>{apartment.name}</div>
                <div className={styles['apartment-section__details']}>
                  {apartment.totalUnit}세대 | 총 {extractBuildingCount(apartment.buildingRange)}동
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={handleToastClose}
        duration={4000}
      />
    </>
  );
};

export default HomePage;