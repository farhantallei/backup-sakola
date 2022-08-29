import { useClient } from '@app/client';
import { Navbar } from '@app/components';
import { useRefreshToken } from '@auth/hooks';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RestrictedRoute() {
  const { isAuthenticated } = useClient();
  const { refreshToken, refetchToken } = useRefreshToken();
  const location = useLocation();

  useEffect(() => {
    refreshToken();
    const interval = setInterval(refreshToken, refetchToken);
    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated == null) return null;
  if (!isAuthenticated) return <Navigate to="/" state={location} replace />;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
