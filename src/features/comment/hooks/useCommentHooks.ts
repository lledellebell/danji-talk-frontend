import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  CreateCommentRequest, 
  UpdateCommentRequest 
} from '../types';
import { commentViewModel } from '../models/CommentViewModel';

/**
 * 댓글 목록 조회를 위한 훅
 */
export const useCommentsQuery = (boardId: string) => {
  return useQuery({
    queryKey: ['comments', boardId],
    queryFn: () => commentViewModel.getComments(boardId),
    enabled: !!boardId,
  });
};

/**
 * 댓글 작성을 위한 훅
 */
export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => commentViewModel.createComment(data),
    onSuccess: (_, variables) => {
      // 댓글 목록 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['comments', variables.boardId] });
      
      // 게시글 상세 캐시 업데이트 (댓글 수 변경)
      queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] });
    },
  });
};

/**
 * 댓글 수정을 위한 훅
 */
export const useUpdateCommentMutation = (boardId: string, commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentRequest) => 
      commentViewModel.updateComment(boardId, commentId, data),
    onSuccess: () => {
      // 댓글 목록 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['comments', boardId] });
    },
  });
};

/**
 * 댓글 삭제를 위한 훅
 */
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, commentId }: { boardId: string; commentId: string }) => 
      commentViewModel.deleteComment(boardId, commentId),
    onSuccess: (_, variables) => {
      // 댓글 목록 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['comments', variables.boardId] });
      
      // 게시글 상세 캐시 업데이트 (댓글 수 변경)
      queryClient.invalidateQueries({ queryKey: ['board', variables.boardId] });
    },
  });
}; 