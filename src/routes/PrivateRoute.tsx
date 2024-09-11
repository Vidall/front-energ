import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
  const token = sessionStorage.getItem('access_token');

  return token ? (
    <Component />
  ) : (
    <Navigate to="/entrar" />
  );
};

export default PrivateRoute;
