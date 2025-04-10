import { Outlet } from 'react-router-dom';
import { LoginPage } from '../pages/Login/LoginPage';
import { RegisterPage } from '../pages/Register/RegisterPage';
import { RegisterSuccessPage } from '../pages/Register/RegisterSuccessPage';
import FindAccount from '../pages/FindAccount/FindAccount';
import ShowEmail from '../pages/ShowEmail/ShowEmail';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Header from '../layouts/Header';
import { useLocation } from 'react-router-dom';

const AuthRoutes = () => {
  const location = useLocation();
  
  const renderContent = () => {
    switch (location.pathname) {
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/register-success':
        return (
          <>
            <Header title="회원가입" type="sub" hasBackButton={true} />
            <RegisterSuccessPage />
          </>
        );
      case '/find-account':
        return (
          <>
            <Header title="아이디/비밀번호 찾기" type="sub" hasBackButton={true} />
            <FindAccount />
          </>
        );
      case '/show-email':
        return (
          <>
            <Header title="아이디/비밀번호 찾기" type="sub" hasBackButton={true} />
            <ShowEmail />
          </>
        );
      case '/reset-password':
        return (
          <>
            <Header title="비밀번호 재설정" type="sub" hasBackButton={true} />
            <ResetPassword />
          </>
        );
      default:
        return <Outlet />;
    }
  };

  return renderContent();
};

export default AuthRoutes; 