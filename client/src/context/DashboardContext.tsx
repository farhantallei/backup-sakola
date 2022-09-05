import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface DashboardContextValue {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextValue>(null!);

export function useDashboardContext(): DashboardContextValue {
  return useContext(DashboardContext) || {};
}

interface DashboardProviderProps {
  children?: React.ReactNode;
}

function DashboardProvider({ children }: DashboardProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      pathname === '/beranda' ||
      pathname === '/draf' ||
      pathname === '/arsip' ||
      pathname === '/to-do' ||
      pathname === '/berjalan' ||
      pathname === '/selesai'
    ) {
      if (!isSidebarOpen) openSidebar();
    }
  }, [pathname]);

  function openSidebar() {
    setIsSidebarOpen(true);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  const value: DashboardContextValue = {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
