import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('/src/mocks/db.json');
  if (!response.ok) {
    throw new Error('네트워크 응답이 없습니다.');
  }
  return response.json();
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};