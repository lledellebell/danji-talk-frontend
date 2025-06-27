import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiClient } from '../../../api/client';
import { Danji, PopularKeyword, RecentKeyword, RecentApartment } from '../../../types/search';

interface SearchParams {
  keyword: string;
  lastIndex?: number;
  limit?: number;
}

interface PopularKeywordsParams {
  limit?: number;
}

interface RecentKeywordsParams {
  limit?: number;
}

interface RecentApartmentsParams {
  limit?: number;
}

class SearchViewModel {
  async searchDanji(params: SearchParams): Promise<Danji[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH.DANJI, { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('단지 검색에 실패했습니다.', error);
      throw error;
    }
  }

  async getPopularKeywords(params: PopularKeywordsParams): Promise<PopularKeyword[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH.POPULAR_KEYWORDS, { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('인기 검색어 조회에 실패했습니다.', error);
      throw error;
    }
  }

  async getRecentKeywords(params: RecentKeywordsParams): Promise<RecentKeyword[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH.RECENT_KEYWORDS, { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('최근 검색어 조회에 실패했습니다.', error);
      throw error;
    }
  }

  async getRecentApartments(params: RecentApartmentsParams): Promise<RecentApartment[]> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH.RECENT_APARTMENT, { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('최근 찾아본 단지 조회에 실패했습니다.', error);
      throw error;
    }
  }

  async addRecentKeyword(keyword: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.SEARCH.ADD_RECENT_KEYWORD, { keyword });
    } catch (error) {
      console.error('최근 검색어 추가에 실패했습니다.', error);
      // 이 에러는 사용자에게 직접적인 영향을 주지 않을 수 있으므로, 에러를 던지지 않고 콘솔에만 기록합니다.
    }
  }
}

export default SearchViewModel; 