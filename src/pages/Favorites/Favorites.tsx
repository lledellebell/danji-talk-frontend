import { useState } from 'react';
import logo from '../../assets/logo.svg';
import styles from './Favorites.module.scss';

interface FavoriteItem {
  id: number;
  name: string;
  address: string;
}

const Favorites = () => {
  // 임시 데이터, 실제로는 API나 상태 관리를 통해 가져와야 함
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    // 테스트용 데이터
    // { id: 1, name: '래미안 아파트', address: '서울시 강남구' },
  ]);

  if (favorites.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <img
          src={logo}
          alt=""
          className={styles['empty-state__icon']}
          aria-hidden="true"
        />
        <p className={styles['empty-state__text']}>즐겨찾기가 비어있습니다.</p>
        <p className={styles['empty-state__subtext']}>
          관심 있는 단지를 즐겨찾기에 추가해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.favorites}>
      <ul className={styles['favorites__list']}>
        {favorites.map((item) => (
          <li key={item.id} className={styles['favorites__item']}>
            <div className={styles['favorites__content']}>
              <h3 className={styles['favorites__name']}>{item.name}</h3>
              <p className={styles['favorites__address']}>{item.address}</p>
            </div>
            <button
              type="button"
              className={styles['favorites__button']}
              onClick={() => {
                // 즐겨찾기 제거 로직
                setFavorites(favorites.filter((fav) => fav.id !== item.id));
              }}
              aria-label="즐겨찾기 제거"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="#97BBFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
