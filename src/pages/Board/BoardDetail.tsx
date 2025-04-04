import { useParams } from 'react-router-dom';
import { useBoardDetail } from '../../hooks/useBoardDetail';

export const BoardDetail = () => {
  const { feedId } = useParams();
  const { data, isLoading } = useBoardDetail(Number(feedId));

  console.log(data, '11111111111111');
  return <div>글 상세</div>;
};
