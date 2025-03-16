import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { DeleteAccount } from './pages/DeleteAccount/DeleteAccount';
import { useAuthStore } from './stores/authStore';
import { BoardWrite } from './pages/Board/BoardWrite';
import FindAccount from './pages/FindAccount/FindAccount';
import ShowEmail from './pages/ShowEmail/ShowEmail';
import Header from './layouts/Header';
import './styles/App.css';

function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <>
              <Header title="홈페이지" type="main" />
              {isLoggedIn ? (
                <div>홈페이지</div>
              ) : (
                <Navigate to="/login" replace />
              )}
            </>
          }
        />
        <Route
          path="/find-account"
          element={
            <>
              <Header
                title="이메일/비밀번호 찾기"
                type="sub"
                hasBackButton={true}
              />
              <FindAccount />
            </>
          }
        />
        <Route
          path="/show-email"
          element={
            <>
              <Header
                title="이메일/비밀번호 찾기 결과"
                type="sub"
                hasBackButton={true}
              />
              <ShowEmail />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Header title="회원가입" type="sub" hasBackButton={true} />
            </>
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? <div>홈페이지</div> : <Navigate to="/login" replace />
          }
        />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/write" element={<BoardWrite />} />
      </Routes>
    </Router>
  );
}

export default App;
