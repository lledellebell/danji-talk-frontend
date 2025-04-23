import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { AxiosError } from 'axios';

export interface Board {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isBookmarked: boolean;
  isLiked: boolean;
}

export interface BoardListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface BoardListResponse {
  boards: Board[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBoardRequest {
  title: string;
  content: string;
  category?: string;
}

export interface UpdateBoardRequest {
  title?: string;
  content?: string;
  category?: string;
}

// 에러 메시지 매핑
const errorMessages = {
  401: '로그인이 필요한 기능입니다',
  403: '권한이 없습니다',
  404: '존재하지 않는 게시글입니다',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  networkError: '인터넷 연결을 확인해주세요',
  default: '게시글을 불러오는 중 오류가 발생했습니다',
};

/**
 * 게시판 관련 비즈니스 로직을 처리하는 ViewModel
 */
export class BoardViewModel {
  /**
   * 게시글 목록 조회
   */
  async getBoards(params: BoardListParams = {}): Promise<BoardListResponse> {
    try {
      const response = await apiClient.get<BoardListResponse>(API_ENDPOINTS.BOARD.LIST, {
        params,
      });
      
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error(errorMessages.default);
    }
  }
  
  /**
   * 게시글 상세 조회
   */
  async getBoardDetail(id: string): Promise<Board> {
    try {
      const response = await apiClient.get<Board>(API_ENDPOINTS.BOARD.DETAIL(id));
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error(errorMessages.default);
    }
  }
  
  /**
   * 게시글 생성
   */
  async createBoard(data: CreateBoardRequest): Promise<Board> {
    try {
      const response = await apiClient.post<Board>(API_ENDPOINTS.BOARD.CREATE, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('게시글 작성 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 게시글 수정
   */
  async updateBoard(id: string, data: UpdateBoardRequest): Promise<Board> {
    try {
      const response = await apiClient.put<Board>(API_ENDPOINTS.BOARD.UPDATE(id), data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('게시글 수정 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 게시글 삭제
   */
  async deleteBoard(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.BOARD.DELETE(id));
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('게시글 삭제 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 게시글 좋아요/좋아요 취소
   */
  async toggleLike(id: string): Promise<{ isLiked: boolean; likeCount: number }> {
    try {
      const response = await apiClient.post<{ isLiked: boolean; likeCount: number }>(
        API_ENDPOINTS.REACTION.LIKE(id)
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('좋아요 처리 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 게시글 북마크/북마크 취소
   */
  async toggleBookmark(id: string): Promise<{ isBookmarked: boolean }> {
    try {
      const response = await apiClient.post<{ isBookmarked: boolean }>(
        API_ENDPOINTS.REACTION.BOOKMARK(id)
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('북마크 처리 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 에러 처리 공통 메서드
   */
  private handleError(error: unknown): void {
    if (error instanceof AxiosError && error.response) {
      const status = error.response.status;
      const message = 
        errorMessages[status as keyof typeof errorMessages] || 
        error.response.data?.message || 
        errorMessages.default;
        
      throw new Error(message);
    }
    
    if (error instanceof AxiosError && error.request) {
      throw new Error(errorMessages.networkError);
    }
  }
}

// 싱글톤 인스턴스 제공
export const boardViewModel = new BoardViewModel(); 