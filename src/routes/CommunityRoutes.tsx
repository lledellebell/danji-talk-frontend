import { Outlet } from 'react-router-dom';
import { BoardList } from '../pages/Board/BoardList';
import { BoardDetail } from '../pages/Board/BoardDetail';
import { BoardWrite } from '../pages/Board/BoardWrite';
import ProtectedRoute from './ProtectedRoute';
import { useLocation } from 'react-router-dom';

const CommunityRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname === '/community') {
      return <BoardList />;
    } else if (location.pathname.startsWith('/community/feed/')) {
      return <BoardDetail />;
    } else if (location.pathname === '/write') {
      return <BoardWrite />;
    }

    return <Outlet />;
  };

  return <ProtectedRoute>{renderContent()}</ProtectedRoute>;
};

export default CommunityRoutes;
