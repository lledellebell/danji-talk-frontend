import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/Search/SearchBar';
import { useSearch } from '../../features/search/hooks/useSearch';
import { RecentApartment } from '../../types/search';
import styles from './SearchPage.module.scss';
import Spinner from '../../components/common/Spinner/Spinner';
import Toast from '../../components/common/Toast/Toast';
import back_icon from '../../assets/back_icon.svg';
import { 
  autocompleteData, 
  recentApartmentsData, 
  recommendedKeywords, 
  popularKeywordsData 
} from '../../data/apartments';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword');
  const navigate = useNavigate();
  
  const {
    searchResults,
    recentKeywords,
    isLoading,
    error,
    fetchPopularKeywords,
    fetchRecentKeywords,
    fetchRecentApartments,
  } = useSearch();

  const [hasSearched, setHasSearched] = useState(!!keywordFromUrl);
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});
  const [searchInput, setSearchInput] = useState(keywordFromUrl || '');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [localSearchResults, setLocalSearchResults] = useState<Array<{ 
    id: number; 
    name: string; 
    address: string; 
    imageUrl: string;
    totalUnit: number;
    buildingRange: string;
  }>>([]);

  const filteredAutocomplete = autocompleteData.filter(item =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    if (keywordFromUrl) {
      setHasSearched(true);
      setSearchInput(keywordFromUrl);
      handleSearch(keywordFromUrl);
    } else {
      setHasSearched(false);
      setSearchInput('');
      setLocalSearchResults([]);
      fetchPopularKeywords();
      fetchRecentKeywords();
      fetchRecentApartments();
    }
  }, [keywordFromUrl, fetchPopularKeywords, fetchRecentKeywords, fetchRecentApartments]);

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
    
    const searchTerm = keyword.toLowerCase().trim();
    let mockResults: Array<{
      id: number;
      name: string;
      region: string;
      imageUrl: string;
      totalUnit: number;
      buildingRange: string;
    }> = [];
    
    const exactMatches = autocompleteData.filter(item =>
      item.name.toLowerCase() === searchTerm
    );
    
    const partialNameMatches = autocompleteData.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
    
    const regionMatches = autocompleteData.filter(item =>
      item.region.toLowerCase().includes(searchTerm)
    );
    
    if (exactMatches.length > 0) {
      mockResults = exactMatches;
    } else if (partialNameMatches.length > 0) {
      mockResults = partialNameMatches;
    } else if (regionMatches.length > 0) {
      mockResults = regionMatches;
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

  const handleSearchResultClick = (result: { id: number; name: string; address: string }) => {
    navigate(`/complex/${result.id}`);
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
    
    // 토스트 메시지 표시
    setToastMessage('즐겨찾기 기능은 현재 개발 중입니다. 곧 만나보실 수 있어요!');
    setIsToastVisible(true);
  };

  const handleToastClose = () => {
    setIsToastVisible(false);
  };

  const extractBuildingCount = (buildingRange: string) => {
    const match = buildingRange.match(/\((\d+)개동\)/);
    return match ? match[1] : '';
  };

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
        {!isLoading && !error && hasSearched && searchResults.length === 0 && localSearchResults.length === 0 && (
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
                <li 
                  key={result.id} 
                  className={styles['search-page__clickable-item']}
                  onClick={() => handleSearchResultClick(result)}
                >
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
        
        {!isLoading && !error && searchResults.length > 0 && localSearchResults.length === 0 && (
          <div className={styles['search-page__search-results']}>
            <h2 className={styles['search-page__title']}>
              검색 결과 <span className={styles['search-page__result-count']}>{searchResults.length}건</span>
            </h2>
            <ul>
              {searchResults.map((result) => (
                <li 
                  key={result.id} 
                  className={styles['search-page__clickable-item']}
                  onClick={() => handleSearchResultClick(result)}
                >
                  <div className={styles['search-page__danji-content']}>
                    <div className={styles['search-page__danji-thumbnail']}>
                      <img 
                        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=300&fit=crop"
                        alt={result.name}
                        className={styles['search-page__danji-image']}
                      />
                    </div>
                    <div className={styles['search-page__danji-details']}>
                      <p className={styles['search-page__danji-name']}>{result.name}</p>
                      <p className={styles['search-page__danji-address']}>{result.address}</p>
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
      
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={handleToastClose}
        duration={4000}
      />
    </div>
  );
};

export default SearchPage; 