import { COURSE } from '@app/constants/queryKey';
import { useDashboardContext } from '@app/context/DashboardContext';
import { getCourse } from '@app/services/course';
import { useNavigationProgressContext } from '@progress';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

function usePrefetchCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { closeSidebar } = useDashboardContext();
  const {
    running,
    startNavigationProgress,
    resetNavigationProgress,
    finishNavigationProgress,
  } = useNavigationProgressContext();

  return async function prefetchCourse(id: string) {
    if (running) resetNavigationProgress();
    startNavigationProgress();
    await queryClient.prefetchQuery({
      queryKey: [COURSE, id],
      queryFn: () => getCourse({ id }),
    });
    finishNavigationProgress();
    closeSidebar();
    navigate(`/pelajaran/${id}`, { state: location });
  };
}

export default usePrefetchCourse;
