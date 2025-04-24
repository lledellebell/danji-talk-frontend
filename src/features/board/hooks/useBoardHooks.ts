import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Board,
  BoardListParams, 
  CreateBoardRequest, 
  UpdateBoardRequest 
} from '../types';
import { boardViewModel } from '../models/BoardViewModel';

/**
 * 게시글 목록 조회를 위한 훅
 */
export const useBoardsQuery = (params: BoardListParams = {}) => {
  return useQuery({
    queryKey: ['boards', params],
    queryFn: () => boardViewModel.getBoards(params),
  });
};

/**
 * 게시글 상세 조회를 위한 훅
 */
export const useBoardDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['board', id],
    queryFn: () => boardViewModel.getBoardDetail(id),
    // 게시글이 없는 경우에도 에러로 처리하지 않음
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('존재하지 않는 게시글')) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

/**
 * 게시글 조회수 증가를 위한 훅
 */
export const useIncreaseViewCount = () => {
  return useMutation({
    mutationFn: (id: string) => boardViewModel.increaseViewCount(id),
    // 실패해도 사용자 경험에 영향이 없으므로 특별한 처리 없음
  });
};

/**
 * 게시글 작성을 위한 훅
 */
export const useCreateBoardMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateBoardRequest) => boardViewModel.createBoard(data),
    onSuccess: (data) => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      
      // 새로 생성된 게시글 상세 페이지로 이동
      navigate(`/boards/${data.id}`);
    },
  });
};

/**
 * 게시글 수정을 위한 훅
 */
export const useUpdateBoardMutation = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UpdateBoardRequest) => boardViewModel.updateBoard(id, data),
    onSuccess: () => {
      // 해당 게시글 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['board', id] });
      
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      
      // 수정된 게시글 상세 페이지로 이동
      navigate(`/boards/${id}`);
    },
  });
};

/**
 * 게시글 삭제를 위한 훅
 */
export const useDeleteBoardMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => boardViewModel.deleteBoard(id),
    onSuccess: () => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      
      // 목록 페이지로 이동
      navigate('/boards');
    },
  });
};

/**
 * 게시글 좋아요 토글을 위한 훅
 */
export const useLikeBoardMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => boardViewModel.toggleLike(id),
    onSuccess: (data) => {
      // 해당 게시글 캐시 업데이트
      queryClient.setQueryData<Board | undefined>(['board', id], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          isLiked: data.isLiked,
          likeCount: data.likeCount,
        };
      });
    },
  });
};

/**
 * 게시글 북마크 토글을 위한 훅
 */
export const useBookmarkBoardMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => boardViewModel.toggleBookmark(id),
    onSuccess: (data) => {
      // 해당 게시글 캐시 업데이트
      queryClient.setQueryData<Board | undefined>(['board', id], (oldData) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          isBookmarked: data.isBookmarked,
        };
      });
    },
  });
}; 