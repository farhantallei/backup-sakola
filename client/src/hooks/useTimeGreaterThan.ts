import { useCallback } from 'react';

function useTimeGreaterThan() {
  const isMoreThan3Days = useCallback((date: string): boolean => {
    return (
      new Date().getTime() - new Date(date).getTime() > 1000 * 3600 * 24 * 3
    );
  }, []);

  const isMoreThanAYear = useCallback((date: string): boolean => {
    return new Date(date).getFullYear() > new Date().getFullYear();
  }, []);

  return { isMoreThan3Days, isMoreThanAYear };
}

export default useTimeGreaterThan;
