import { useAuth } from '@/context/AuthContext';
import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const renderContent = useMemo(() => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }, [isAuthenticated, children]);

  return renderContent;
};

export default PrivateRoute;
