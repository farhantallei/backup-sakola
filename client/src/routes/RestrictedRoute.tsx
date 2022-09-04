import { getAccessToken } from '@app/client';
import { Navbar } from '@app/components';
import DashboardProvider from '@app/context/DashboardContext';
import { useRefreshToken } from '@auth/hooks';
import Sidebar from '@sidebar';
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
    <DashboardProvider>
      <Navbar />
      <main className="flex flex-1 flex-row">
        <Sidebar />
        <section className="flex-1 bg-gray-50 min-h-[calc(100vh-4rem)] px-9 py-12">
          <Outlet />
        </section>
      </main>
    </DashboardProvider>
  );
}

export default RestrictedRoute;
