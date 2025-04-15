import { Outlet, useLocation } from 'react-router-dom';
import Header from '../layouts/Header';
import Settings from '../pages/Settings/Settings';
import Withdrawal from '../pages/Settings/Withdrawal/Withdrawal';
import Profile from '../pages/Settings/Profile/Profile';
import ProtectedRoute from './ProtectedRoute';

const SettingsRoutes = () => {
  const location = useLocation();

  const renderContent = () => {
    const path = location.pathname;

    if (path === '/settings') {
      return (
        <>
          <Header title="설정" type="sub" hasBackButton={true} />
          <Settings />
        </>
      );
    } else if (path === '/settings/withdrawal') {
      return (
        <>
          <Header title="회원탈퇴" type="sub" hasBackButton={true} />
          <Withdrawal />
        </>
      );
    } else if (path === '/settings/profile') {
      return (
        <>
          <Header title="개인 정보 변경" type="sub" hasBackButton={true} />
          <Profile />
        </>
      );
    }

    return <Outlet />;
  };

  return <ProtectedRoute>{renderContent()}</ProtectedRoute>;
};

export default SettingsRoutes;
