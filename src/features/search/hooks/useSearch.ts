import { useState, useCallback } from 'react';
import SearchViewModel from '../models/SearchViewModel';
import { Danji, PopularKeyword, RecentKeyword, RecentApartment } from '../../../types/search';

const searchViewModel = new SearchViewModel();

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<Danji[]>([]);
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);
  const [recentKeywords, setRecentKeywords] = useState<RecentKeyword[]>([]);
  const [recentApartments, setRecentApartments] = useState<RecentApartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchDanji = useCallback(async (keyword: string) => {
    if (!keyword) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await searchViewModel.addRecentKeyword(keyword);
      const results = await searchViewModel.searchDanji({ keyword });
      setSearchResults(results);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPopularKeywords = useCallback(async (limit: number = 5) => {
    setIsLoading(true);
    setError(null);
    try {
      const keywords = await searchViewModel.getPopularKeywords({ limit });
      setPopularKeywords(keywords);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecentKeywords = useCallback(async (limit: number = 5) => {
    setIsLoading(true);
    setError(null);
    try {
      const keywords = await searchViewModel.getRecentKeywords({ limit });
      setRecentKeywords(keywords);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRecentApartments = useCallback(async (limit: number = 5) => {
    setIsLoading(true);
    setError(null);
    try {
      const apartments = await searchViewModel.getRecentApartments({ limit });
      setRecentApartments(apartments);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    searchResults,
    popularKeywords,
    recentKeywords,
    recentApartments,
    isLoading,
    error,
    searchDanji,
    fetchPopularKeywords,
    fetchRecentKeywords,
    fetchRecentApartments,
  };
}; 