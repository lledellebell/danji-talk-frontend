import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'
import { useAuthStore } from './stores/authStore'
import FindAccount from './pages/FindAccount/FindAccount'
import Header from './layouts/Header'
import ShowEmail from './pages/ShowEmail/ShowEmail'

function App() {
  const { isLoggedIn } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <>
              <Header title="로그인" type="sub" hasBackButton={true} />
              {isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
            </>
          } 
        />
        <Route 
          path="/" 
          element={
            <>
              <Header title="홈페이지" type="main" />
              {isLoggedIn ? <div>홈페이지</div> : <Navigate to="/login" replace />}
            </>
          } 
        />
        <Route 
          path="/find-account" 
          element={
            <>
              <Header title="이메일/비밀번호 찾기" type="sub" hasBackButton={true} />
              <FindAccount />
            </>
          } 
        />
        <Route 
          path="/show-email" 
          element={
            <>
              <Header title="이메일/비밀번호 찾기 결과" type="sub" hasBackButton={true} />
              <ShowEmail />
            </>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
