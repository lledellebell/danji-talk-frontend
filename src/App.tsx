import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'
import { useAuthStore } from './stores/authStore'
import FindAccount from './pages/FindAccount/FindAccount'

function App() {
  const { isLoggedIn } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/" 
          element={
            isLoggedIn ? <div>홈페이지</div> : <Navigate to="/login" replace />
          } 
        />
        <Route path="/find-account" element={<FindAccount />} />
      </Routes>
    </Router>
  )
}

export default App
