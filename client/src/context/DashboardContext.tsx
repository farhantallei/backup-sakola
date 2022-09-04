import { createContext, useContext, useState } from 'react';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
