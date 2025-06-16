import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/Search/SearchBar';
import { useSearch } from '../../features/search/hooks/useSearch';
import styles from './SearchPage.module.scss';
import Spinner from '../../components/common/Spinner/Spinner';
import back_icon from '../../assets/back_icon.svg';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword');
  const navigate = useNavigate();
  
  const {
    searchResults,
    popularKeywords,
    recentKeywords,
    isLoading,
    error,
    searchDanji,
    fetchPopularKeywords,
    fetchRecentKeywords,
  } = useSearch();

  const [hasSearched, setHasSearched] = useState(!!keywordFromUrl);

  useEffect(() => {
    if (keywordFromUrl) {
      searchDanji(keywordFromUrl);
    } else {
      fetchPopularKeywords();
      fetchRecentKeywords();
    }
  }, [keywordFromUrl, searchDanji, fetchPopularKeywords, fetchRecentKeywords]);

  const handleSearch = (keyword: string) => {
    setHasSearched(true);
    searchDanji(keyword);
    setSearchParams({ keyword });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
          aria-label="이전 페이지로 이동"
        >
          <img src={back_icon} alt="" aria-hidden="true" />
        </button>
        <SearchBar
          onSearch={handleSearch}
          initialValue={keywordFromUrl || ''}
        />
      </div>
      <div className={styles.content}>
        {isLoading && <Spinner />}
        {error && <p className={styles.error}>오류가 발생했습니다: {error.message}</p>}
        {!isLoading && !error && !hasSearched && (
          <>
            {recentKeywords.length > 0 && (
              <div className={styles.recentKeywords}>
                <h2 className={styles.title}>최근 검색어</h2>
                <ul>
                  {recentKeywords.map((kw) => (
                    <li key={kw.keyword}>{kw.keyword}</li>
                  ))}
                </ul>
              </div>
            )}
            {popularKeywords.length > 0 && (
              <div className={styles.popularKeywords}>
                <h2 className={styles.title}>인기 검색어</h2>
                <ul>
                  {popularKeywords.map((kw) => (
                    <li key={kw.keyword}>{kw.keyword}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {!isLoading && !error && hasSearched && searchResults.length === 0 && (
          <div className={styles.searchResults}>
            <h2 className={styles.title}>검색 결과</h2>
            <p className={styles.noResults}>검색 결과가 없습니다.</p>
          </div>
        )}
        {!isLoading && !error && searchResults.length > 0 && (
          <div className={styles.searchResults}>
            <h2 className={styles.title}>검색 결과</h2>
            <ul>
              {searchResults.map((danji) => (
                <li key={danji.id}>
                  <p className={styles.danjiName}>{danji.name}</p>
                  <p className={styles.danjiAddress}>{danji.address}</p>
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