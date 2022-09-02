import { getAccessToken } from '@app/client';
import { Navbar } from '@app/components';
import { useRefreshToken } from '@auth/hooks';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RestrictedRoute() {
  const accessToken = getAccessToken();
  const { refreshToken, refetchToken } = useRefreshToken();
  const location = useLocation();

  useEffect(() => {
    if (accessToken) return;
    refreshToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshToken, refetchToken);
    return () => clearInterval(interval);
  }, []);

  if (accessToken == null) return null;
  if (!accessToken) return <Navigate to="/" state={location} replace />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default RestrictedRoute;
