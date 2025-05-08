/**
 * 댓글 관련 타입 정의
 */

// 댓글 인터페이스
export interface Comment {
  id: string;
  content: string;
  boardId: string;
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isAuthor: boolean;
}

// 댓글 목록 응답
export interface CommentListResponse {
  comments: Comment[];
  total: number;
}

// 댓글 작성 요청
export interface CreateCommentRequest {
  boardId: string;
  content: string;
}

// 댓글 수정 요청
export interface UpdateCommentRequest {
  content: string;
}

// 댓글 삭제 요청 매개변수
export interface DeleteCommentParams {
  boardId: string;
  commentId: string;
}
