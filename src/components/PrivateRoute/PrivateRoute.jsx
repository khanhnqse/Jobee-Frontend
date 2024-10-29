import { useAuth } from '@/context/AuthContext';
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, userRole } = useAuth();

  const renderContent = useMemo(() => {
    console.log('Is Authenticated:', isAuthenticated);
    console.log('User Role:', userRole);
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (roles && !roles.includes(userRole)) {
      return <Navigate to="/login" />;
    }
    return children;
  }, [isAuthenticated, userRole, roles, children]);

  return renderContent;
};

export default PrivateRoute;
