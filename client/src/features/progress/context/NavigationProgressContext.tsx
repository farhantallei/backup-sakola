import { useTimeout } from '@app/hooks';
import { getRandomInt } from '@app/utils';
import { createContext, useContext, useState } from 'react';
import { NavigationProgress } from '../components';

interface NavigationProgressContextValue {
  startNavigationProgress: () => void;
  finishNavigationProgress: () => void;
  resetNavigationProgress: () => void;
}

const NavigationProgressContext = createContext<NavigationProgressContextValue>(
  null!
);

export function useNavigationProgressContext(): NavigationProgressContextValue {
  return useContext(NavigationProgressContext) || {};
}

interface NavigationProgressProviderProps {
  children?: React.ReactNode;
}

function NavigationProgressProvider({
  children,
}: NavigationProgressProviderProps) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [end, setEnd] = useState(false);

  const [isEndTimeoutReady, clearEndTimeout, setEndTimeout] = useTimeout(() => {
    setEnd(false);
    setProgress(0);
  }, 1000);

  function startNavigationProgress() {
    setRunning(true);
    setProgress(getRandomInt(30, 70));
  }

  function finishNavigationProgress() {
    setEnd(true);
    setEndTimeout();
    setRunning(false);
    setProgress(100);
  }

  function resetNavigationProgress() {
    clearEndTimeout();
    setProgress(0);
    setRunning(false);
    setEnd(false);
  }

  const value: NavigationProgressContextValue = {
    startNavigationProgress,
    finishNavigationProgress,
    resetNavigationProgress,
  };

  return (
    <NavigationProgressContext.Provider value={value}>
      <NavigationProgress progress={progress} running={running} end={end} />
      {children}
    </NavigationProgressContext.Provider>
  );
}

export default NavigationProgressProvider;
