import { apiClient } from '../../../api/client';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { AxiosError } from 'axios';
import {
  Comment,
  CommentListResponse,
  CreateCommentRequest,
  UpdateCommentRequest
} from '../types';

// 에러 메시지 매핑
const errorMessages = {
  401: '로그인이 필요한 기능입니다',
  403: '권한이 없습니다',
  404: '존재하지 않는 댓글 또는 게시글입니다',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  networkError: '인터넷 연결을 확인해주세요',
  default: '댓글을 불러오는 중 오류가 발생했습니다',
};

/**
 * 댓글 관련 비즈니스 로직을 처리하는 ViewModel
 */
export class CommentViewModel {
  /**
   * 댓글 목록 조회
   */
  async getComments(boardId: string): Promise<CommentListResponse> {
    try {
      const response = await apiClient.get<CommentListResponse>(
        API_ENDPOINTS.COMMENT.LIST(boardId)
      );
      
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error(errorMessages.default);
    }
  }
  
  /**
   * 댓글 작성
   */
  async createComment(data: CreateCommentRequest): Promise<Comment> {
    try {
      const response = await apiClient.post<Comment>(
        API_ENDPOINTS.COMMENT.CREATE(data.boardId),
        { content: data.content }
      );
      
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('댓글 작성 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 댓글 수정
   */
  async updateComment(boardId: string, commentId: string, data: UpdateCommentRequest): Promise<Comment> {
    try {
      const response = await apiClient.put<Comment>(
        API_ENDPOINTS.COMMENT.UPDATE(boardId, commentId),
        data
      );
      
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('댓글 수정 중 오류가 발생했습니다');
    }
  }
  
  /**
   * 댓글 삭제
   */
  async deleteComment(boardId: string, commentId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.COMMENT.DELETE(boardId, commentId));
    } catch (error: unknown) {
      this.handleError(error);
      throw new Error('댓글 삭제 중 오류가 발생했습니다');
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
export const commentViewModel = new CommentViewModel(); 