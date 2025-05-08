/**
 * 게시판 관련 타입 정의
 */

// 게시글 인터페이스
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

// 게시글 목록 조회 매개변수
export interface BoardListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

// 게시글 목록 응답
export interface BoardListResponse {
  boards: Board[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 게시글 생성 요청
export interface CreateBoardRequest {
  title: string;
  content: string;
  category?: string;
}

// 게시글 수정 요청
export interface UpdateBoardRequest {
  title?: string;
  content?: string;
  category?: string;
}

// 좋아요 응답
export interface LikeResponse {
  isLiked: boolean;
  likeCount: number;
}

// 북마크 응답
export interface BookmarkResponse {
  isBookmarked: boolean;
}
