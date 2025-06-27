import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/Search/SearchBar';
import { useSearch } from '../../features/search/hooks/useSearch';
import { RecentApartment } from '../../types/search';
import styles from './SearchPage.module.scss';
import Spinner from '../../components/common/Spinner/Spinner';
import back_icon from '../../assets/back_icon.svg';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword');
  const navigate = useNavigate();
  
  const {
    recentKeywords,
    isLoading,
    error,
    searchDanji,
    fetchPopularKeywords,
    fetchRecentKeywords,
    fetchRecentApartments,
  } = useSearch();

  const [hasSearched, setHasSearched] = useState(!!keywordFromUrl);
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});
  const [searchInput, setSearchInput] = useState(keywordFromUrl || '');
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const autocompleteData = [
    { 
      id: 1, 
      name: '래미안원베일리', 
      region: '서울시 서초구 반포동', 
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=300&fit=crop',
      totalUnit: 2990,
      buildingRange: '101동 ~ 123동 (23개동)'
    },
    { 
      id: 2, 
      name: '래미안아파트', 
      region: '서울시 강남구 역삼동', 
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop',
      totalUnit: 1500,
      buildingRange: '101동 ~ 115동 (15개동)'
    },
    { 
      id: 3, 
      name: '래미안빌라', 
      region: '서울시 마포구 합정동', 
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
      totalUnit: 800,
      buildingRange: '101동 ~ 108동 (8개동)'
    },
    { 
      id: 4, 
      name: '래미안타워', 
      region: '서울시 송파구 잠실동', 
      imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=300&fit=crop',
      totalUnit: 2000,
      buildingRange: '101동 ~ 120동 (20개동)'
    },
    { 
      id: 5, 
      name: '래미안하이츠', 
      region: '서울시 영등포구 여의도동', 
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=300&fit=crop',
      totalUnit: 1200,
      buildingRange: '101동 ~ 112동 (12개동)'
    },
    { 
      id: 6, 
      name: '반포센트럴자이', 
      region: '서울시 서초구 잠원동', 
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop',
      totalUnit: 757,
      buildingRange: '101동 ~ 107동 (7개동)'
    },
    { 
      id: 7, 
      name: '서초역푸르지오', 
      region: '서울시 서초구 서초동', 
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=300&fit=crop',
      totalUnit: 890,
      buildingRange: '101동 ~ 110동 (10개동)'
    },
    { 
      id: 8, 
      name: '송파역푸르지오', 
      region: '서울시 송파구 송파동', 
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=300&fit=crop',
      totalUnit: 1200,
      buildingRange: '101동 ~ 115동 (15개동)'
    },
    { 
      id: 9, 
      name: '영등포역푸르지오', 
      region: '서울시 영등포구 영등포동', 
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop',
      totalUnit: 950,
      buildingRange: '101동 ~ 108동 (8개동)'
    },
    { 
      id: 10, 
      name: '오목교역푸르지오', 
      region: '서울시 양천구 목동', 
      imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=300&h=300&fit=crop',
      totalUnit: 1100,
      buildingRange: '101동 ~ 112동 (12개동)'
    },
    { 
      id: 11, 
      name: '마포구아파트', 
      region: '서울시 마포구 공덕동', 
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=300&fit=crop',
      totalUnit: 850,
      buildingRange: '101동 ~ 105동 (5개동)'
    },
    { 
      id: 12, 
      name: '양천구아파트', 
      region: '서울시 양천구 신월동', 
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=300&fit=crop',
      totalUnit: 1300,
      buildingRange: '101동 ~ 118동 (18개동)'
    },
  ];

  const filteredAutocomplete = autocompleteData.filter(item =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    if (keywordFromUrl) {
      searchDanji(keywordFromUrl);
    } else {
      fetchPopularKeywords();
      fetchRecentKeywords();
      fetchRecentApartments();
    }
  }, [keywordFromUrl, searchDanji, fetchPopularKeywords, fetchRecentKeywords, fetchRecentApartments]);

  useEffect(() => {
    if (!searchInput.trim()) {
      setHasSearched(false);
      setLocalSearchResults([]);
      setSearchParams({});
    }
  }, [searchInput, setSearchParams]);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setHasSearched(false);
      setLocalSearchResults([]);
      setSearchParams({});
      return;
    }

    setHasSearched(true);
    setSearchInput(keyword);
    setSearchParams({ keyword });
    
    let mockResults = [];
    
    const exactMatches = autocompleteData.filter(item =>
      item.name.toLowerCase() === keyword.toLowerCase()
    );
    
    const partialMatches = autocompleteData.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.region.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (keyword.includes('구') || keyword.includes('동')) {
      const regionMatches = autocompleteData.filter(item =>
        item.region.toLowerCase().includes(keyword.toLowerCase())
      );
      mockResults = regionMatches;
    } else {
      mockResults = exactMatches.length > 0 ? exactMatches : partialMatches;
    }
    
    if (mockResults.length === 0) {
      if (keyword.includes('래미')) {
        mockResults = autocompleteData.filter(item => 
          item.name.toLowerCase().includes('래미')
        );
      }
      else if (keyword.includes('구') || keyword.includes('동')) {
        mockResults = autocompleteData.filter(item => 
          item.region.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    }
    
    const finalResults = mockResults.map(item => ({
      id: item.id,
      name: item.name,
      address: item.region,
      imageUrl: item.imageUrl,
      totalUnit: item.totalUnit,
      buildingRange: item.buildingRange
    }));
    
    setLocalSearchResults(finalResults);
  };

  const [localSearchResults, setLocalSearchResults] = useState<Array<{ 
    id: number; 
    name: string; 
    address: string; 
    imageUrl: string;
    totalUnit: number;
    buildingRange: string;
  }>>([]);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    
    if (!value.trim()) {
      setHasSearched(false);
      setLocalSearchResults([]);
      setSearchParams({});
    }
  };

  const handleKeywordClick = (keyword: string) => {
    handleSearch(keyword);
  };

  const handleApartmentClick = (apartment: RecentApartment) => {
    navigate(`/complex/${apartment.id}`);
  };

  const handleBack = () => {
    if (searchInput.trim()) {
      setHasSearched(false);
      setSearchInput('');
      setLocalSearchResults([]);
      setSearchParams({});
      setShowAutocomplete(false);
    } else {
      const referrer = document.referrer;
      const currentOrigin = window.location.origin;
      
      if (referrer && referrer.startsWith(currentOrigin)) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const handleAutocompleteSelect = (item: { id: number; name: string; region: string }) => {
    setSearchInput(item.name);
    setShowAutocomplete(false);
    handleSearch(item.name);
  };

  const handleFavoriteToggle = (apartmentId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavoriteStates(prev => ({
      ...prev,
      [apartmentId]: !prev[apartmentId]
    }));
  };

  const extractBuildingCount = (buildingRange: string) => {
    const match = buildingRange.match(/\((\d+)개동\)/);
    return match ? match[1] : '';
  };

  const recommendedKeywords = [
    '래미', '래미안원베일리', '서초구', '마포구', '송파구', '영등포구', '양천구'
  ];

  const popularKeywordsData = [
    '래미안원베일리', '서초역', '반포르엘 아파트', '송파역', '영등포역', '오목교역'
  ];

  const recentApartmentsData = [
    { 
      id: 1, 
      name: '래미안원베일리', 
      region: '서울시 서초구 반포동',
      location: '서울시 서초구 반포동 1',
      totalUnit: 2990,
      parkingCapacity: 3500,
      buildingRange: '101동 ~ 123동 (23개동)',
      lastViewedAt: '2024-01-01',
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=300&fit=crop'
    },
    { 
      id: 2, 
      name: '반포센트럴자이', 
      region: '서울시 서초구 잠원동',
      location: '서울시 서초구 잠원동 162',
      totalUnit: 757,
      parkingCapacity: 3500,
      buildingRange: '101동 ~ 107동 (7개동)',
      lastViewedAt: '2024-01-01',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop'
    },
  ];

  return (
    <div className={styles['search-page']}>
      <div className={styles['search-page__search-bar-container']}>
        <button
          type="button"
          onClick={handleBack}
          className={styles['search-page__back-button']}
          aria-label="이전 페이지로 이동"
        >
          <img src={back_icon} alt="" aria-hidden="true" />
        </button>
        <SearchBar
          onSearch={handleSearch}
          initialValue={keywordFromUrl || ''}
          searchInput={searchInput}
          onSearchInputChange={handleSearchInputChange}
          showAutocomplete={showAutocomplete}
          onShowAutocompleteChange={setShowAutocomplete}
          autocompleteData={filteredAutocomplete}
          onAutocompleteSelect={handleAutocompleteSelect}
        />
      </div>
      <div 
        className={styles['search-page__content']}
        onClick={() => showAutocomplete && setShowAutocomplete(false)}
      >
        {isLoading && <Spinner />}
        {error && <p className={styles['search-page__error']}>오류가 발생했습니다: {error.message}</p>}
        {!isLoading && !error && !hasSearched && (
          <>
            <div className={styles['search-page__recommended-keywords']}>
              <h2 className={styles['search-page__title']}>추천 검색어</h2>
              <ul>
                {recommendedKeywords.map((keyword) => (
                  <li 
                    key={keyword} 
                    onClick={() => handleKeywordClick(keyword)}
                    className={styles['search-page__clickable-item']}
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>

            {popularKeywordsData.length > 0 && (
              <div className={styles['search-page__popular-keywords']}>
                <h2 className={styles['search-page__title']}>인기 검색어</h2>
                <ul>
                  {popularKeywordsData.map((kw) => (
                    <li 
                      key={kw}
                      onClick={() => handleKeywordClick(kw)}
                      className={styles['search-page__clickable-item']}
                    >
                      {kw}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recentApartmentsData.length > 0 && (
              <div className={styles['search-page__recent-apartments']}>
                <h2 className={styles['search-page__title']}>최근 찾아본 단지</h2>
                <ul>
                  {recentApartmentsData.map((apartment) => (
                    <li 
                      key={apartment.id}
                      onClick={() => handleApartmentClick(apartment)}
                      className={styles['search-page__clickable-item']}
                    >
                      <div className={styles['search-page__apartment-content']}>
                        <div className={styles['search-page__apartment-thumbnail']}>
                          <img 
                            src={apartment.imageUrl} 
                            alt={apartment.name}
                            className={styles['search-page__apartment-image']}
                          />
                        </div>
                        <div className={styles['search-page__apartment-details']}>
                          <p className={styles['search-page__apartment-name']}>{apartment.name}</p>
                          <p className={styles['search-page__apartment-address']}>{apartment.location}</p>
                          <p className={styles['search-page__apartment-info']}>
                            {apartment.totalUnit}세대 | 총 {extractBuildingCount(apartment.buildingRange)}동
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleFavoriteToggle(apartment.id, e)}
                          className={styles['search-page__favorite-button']}
                          aria-label="즐겨찾기"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                              d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.62L10 0L7.19 6.62L0 7.24L5.46 11.97L3.82 19L10 15.27Z" 
                              fill={favoriteStates[apartment.id] ? "#ffb700" : "#fff"} 
                              strokeWidth={favoriteStates[apartment.id] ? "2" : "2"}
                              stroke={favoriteStates[apartment.id] ? "#ffb700" : "#C0C0C0"}
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recentKeywords.length > 0 && (
              <div className={styles['search-page__recent-keywords']}>
                <h2 className={styles['search-page__title']}>최근 검색어</h2>
                <ul>
                  {recentKeywords.map((kw) => (
                    <li 
                      key={kw.keyword}
                      onClick={() => handleKeywordClick(kw.keyword)}
                      className={styles['search-page__clickable-item']}
                    >
                      {kw.keyword}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {!isLoading && !error && hasSearched && localSearchResults.length === 0 && (
          <div className={styles['search-page__search-results']}>
            <h2 className={styles['search-page__title']}>
              검색 결과 <span className={styles['search-page__result-count']}>0건</span>
            </h2>
            <p className={styles['search-page__no-results']}>검색 결과가 없습니다.</p>
          </div>
        )}
        {!isLoading && !error && localSearchResults.length > 0 && (
          <div className={styles['search-page__search-results']}>
            <h2 className={styles['search-page__title']}>
              검색 결과 <span className={styles['search-page__result-count']}>{localSearchResults.length}건</span>
            </h2>
            <ul>
              {localSearchResults.map((result) => (
                <li key={result.id} className={styles['search-page__clickable-item']}>
                  <div className={styles['search-page__danji-content']}>
                    <div className={styles['search-page__danji-thumbnail']}>
                      <img 
                        src={result.imageUrl}
                        alt={result.name}
                        className={styles['search-page__danji-image']}
                      />
                    </div>
                    <div className={styles['search-page__danji-details']}>
                      <p className={styles['search-page__danji-name']}>{result.name}</p>
                      <p className={styles['search-page__danji-address']}>{result.address}</p>
                      <p className={styles['search-page__danji-info']}>
                        {result.totalUnit}세대 | 총 {extractBuildingCount(result.buildingRange)}동
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleFavoriteToggle(result.id, e)}
                      className={styles['search-page__favorite-button']}
                      aria-label="즐겨찾기"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.62L10 0L7.19 6.62L0 7.24L5.46 11.97L3.82 19L10 15.27Z" 
                          fill={favoriteStates[result.id] ? "#ffb700" : "#fff"} 
                          strokeWidth={favoriteStates[result.id] ? "2" : "2"}
                          stroke={favoriteStates[result.id] ? "#ffb700" : "#C0C0C0"}
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 