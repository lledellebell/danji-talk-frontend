import { Outlet } from 'react-router-dom';
import Header from '../layouts/Header';
import SearchBar from '../components/Search/SearchBar';
import MenuGrid from '../components/MenuGrid/MenuGrid';
import { ChatList } from '../pages/Chat/ChatList';
import Facilities from '../pages/Facilities/Facilities';
import Favorites from '../pages/Favorites/Favorites';
import ProtectedRoute from './ProtectedRoute';
import { useLocation } from 'react-router-dom';

const HomePage = () => (
  <>
    <Header title="DANJITALK" type="main" />
    <SearchBar />
    <MenuGrid />
  </>
);

const ChatPage = () => (
  <>
    <Header title="채팅" type="sub" hasBackButton={true} />
    <ChatList />
  </>
);

const FacilitiesPage = () => (
  <>
    <Header title="시설정보" type="sub" hasBackButton={true} />
    <Facilities />
  </>
);

const FavoritesPage = () => (
  <>
    <Header title="즐겨찾기" type="sub" hasBackButton={true} />
    <Favorites />
  </>
);

const MainRoutes = () => {
  const location = useLocation();

  // 현재 경로에 따라 적절한 컴포넌트를 렌더링
  const renderContent = () => {
    switch (location.pathname) {
      case '/':
        return <HomePage />;
      case '/chat':
        return <ChatPage />;
      case '/facilities':
        return <FacilitiesPage />;
      case '/favorites':
        return <FavoritesPage />;
      default:
        return <Outlet />;
    }
  };

  return <ProtectedRoute>{renderContent()}</ProtectedRoute>;
};

export default MainRoutes;
