import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  UpdateProfileRequest, 
  DeleteAccountRequest 
} from '../types';
import { userViewModel } from '../models/UserViewModel';

/**
 * 사용자 프로필 조회를 위한 훅
 */
export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => userViewModel.getProfile(),
    retry: false,
  });
};

/**
 * 사용자 프로필 업데이트를 위한 훅
 */
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => userViewModel.updateProfile(data),
    onSuccess: () => {
      // 프로필 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};

/**
 * 계정 삭제를 위한 훅
 */
export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: DeleteAccountRequest) => userViewModel.deleteAccount(data),
    onSuccess: () => {
      // 캐시 데이터 초기화
      queryClient.clear();
      
      // 로그인 페이지로 리다이렉트
      navigate('/login', { replace: true });
    },
  });
}; 