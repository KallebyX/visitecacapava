import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: ('tourist' | 'hotel' | 'secretaria' | 'restaurant')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    switch(user.role) {
      case 'tourist':
        return <Navigate to="/" replace />;
      case 'secretaria':
        return <Navigate to="/admin" replace />;
      case 'hotel':
        return <Navigate to="/hotel" replace />;
      case 'restaurant':
        return <Navigate to="/restaurant" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
