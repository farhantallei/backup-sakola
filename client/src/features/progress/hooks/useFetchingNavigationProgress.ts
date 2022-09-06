import { useEffect } from 'react';
import { useNavigationProgressContext } from '../context/NavigationProgressContext';

function useFetchingNavigationProgress(isFetching: boolean) {
  const {
    startNavigationProgress,
    finishNavigationProgress,
    resetNavigationProgress,
    running,
    end,
  } = useNavigationProgressContext();

  useEffect(() => {
    if (isFetching) {
      if (running || end) {
        resetNavigationProgress();
        return startNavigationProgress();
      }
      return startNavigationProgress();
    }
    if (!isFetching) return finishNavigationProgress();
  }, [isFetching]);
}

export default useFetchingNavigationProgress;
