import { getAccessToken } from '@app/client';
import { useRefreshToken } from '@auth/hooks';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute() {
  const accessToken = getAccessToken();
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    refreshToken();
  }, []);

  if (accessToken == null) return null;
  if (accessToken) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export default AuthRoute;
