import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const username = useAppSelector((state) => state.user.name);

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
