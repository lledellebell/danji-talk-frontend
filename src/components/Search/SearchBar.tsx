import { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || '');

  useEffect(() => {
    if (initialValue !== undefined) {
      setSearchTerm(initialValue);
    }
  }, [initialValue]);

  const handleSearchAction = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchAction();
    }
  };

  return (
    <form className={styles.searchBar}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        단지 검색
      </label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="궁금한 단지를 검색해보세요!"
        id="searchInput"
        className={styles.searchInput}
        aria-label="단지 검색"
      />
      <button
        type="button"
        onClick={handleSearchAction}
        className={styles.searchButton}
        aria-label="검색"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    
    </form>
  );
};

export default SearchBar;
