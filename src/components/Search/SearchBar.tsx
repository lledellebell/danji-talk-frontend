import { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch?: (searchTerm: string) => void;
  initialValue?: string;
  searchInput?: string;
  onSearchInputChange?: (value: string) => void;
  showAutocomplete?: boolean;
  onShowAutocompleteChange?: (show: boolean) => void;
  autocompleteData?: Array<{ id: number; name: string; region: string }>;
  onAutocompleteSelect?: (item: { id: number; name: string; region: string }) => void;
}

const SearchBar = ({ 
  onSearch, 
  initialValue, 
  searchInput,
  onSearchInputChange,
  showAutocomplete,
  onShowAutocompleteChange,
  autocompleteData = [],
  onAutocompleteSelect
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || '');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (initialValue !== undefined) {
      setSearchTerm(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (showAutocomplete) {
      setSelectedIndex(-1);
    }
  }, [showAutocomplete]);

  const handleSearchAction = () => {
    if (onSearch) {
      const currentSearchTerm = searchInput !== undefined ? searchInput : searchTerm;
      onSearch(currentSearchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showAutocomplete && selectedIndex >= 0 && autocompleteData[selectedIndex]) {
        handleAutocompleteClick(autocompleteData[selectedIndex]);
      } else {
        handleSearchAction();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showAutocomplete && autocompleteData.length > 0) {
        setSelectedIndex(prev => 
          prev < autocompleteData.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showAutocomplete && autocompleteData.length > 0) {
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : autocompleteData.length - 1
        );
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (onShowAutocompleteChange) {
        onShowAutocompleteChange(false);
      }
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchInputChange) {
      onSearchInputChange(value);
    }
    if (onShowAutocompleteChange) {
      onShowAutocompleteChange(value.length > 0);
    }
    
    if (!value.trim() && onShowAutocompleteChange) {
      onShowAutocompleteChange(false);
    }
  };

  const handleAutocompleteClick = (item: { id: number; name: string; region: string }) => {
    if (onAutocompleteSelect) {
      onAutocompleteSelect(item);
    }
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} style={{ color: '#97BBFF' }}>{part}</span>
      ) : part
    );
  };

  return (
    <div className={styles['search-bar__container']} onClick={(e) => e.stopPropagation()}>
      <form className={styles['search-bar__form']}>
        <label htmlFor="searchInput" className={styles['search-bar__label']}>
          단지 검색
        </label>
        <input
          type="text"
          value={searchInput !== undefined ? searchInput : searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 단지를 검색해보세요!"
          id="searchInput"
          className={styles['search-bar__input']}
          aria-label="단지 검색"
        />
        <button
          type="button"
          onClick={handleSearchAction}
          className={styles['search-bar__button']}
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
      
      {showAutocomplete && autocompleteData.length > 0 && (
        <div className={styles['search-bar__dropdown']}>
          <ul>
            {autocompleteData.map((item, index) => (
              <li 
                key={item.id}
                onClick={() => handleAutocompleteClick(item)}
                className={`${styles['search-bar__item']} ${index === selectedIndex ? styles['search-bar__item--selected'] : ''}`}
              >
                <div className={styles['search-bar__name']}>
                  {highlightText(item.name, searchInput || searchTerm)}
                </div>
                <div className={styles['search-bar__region']}>
                  {item.region}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
