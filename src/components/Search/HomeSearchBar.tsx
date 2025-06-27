import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeSearchBar.module.scss';

interface HomeSearchBarProps {
  onSearch?: (searchTerm: string) => void;
}

const HomeSearchBar = ({ onSearch }: HomeSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchAction = () => {
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
      
      if (onSearch) {
        onSearch(searchTerm.trim());
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchAction();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchAction();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles['home-search-bar']}>
      <form className={styles['home-search-bar__form']} onSubmit={handleFormSubmit}>
        <label htmlFor="homeSearchInput" className={styles['home-search-bar__label']}>
          단지 검색
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 단지를 검색해보세요!"
          id="homeSearchInput"
          className={styles['home-search-bar__input']}
          aria-label="단지 검색"
        />
        <button
          type="submit"
          className={styles['home-search-bar__button']}
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
    </div>
  );
};

export default HomeSearchBar; 