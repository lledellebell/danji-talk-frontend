import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoute = ({ redirectPath = '/login', children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 