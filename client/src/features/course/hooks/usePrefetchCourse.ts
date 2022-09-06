import { COURSE } from '@app/constants/queryKey';
import { useDashboardContext } from '@app/context/DashboardContext';
import { getCourse } from '@app/services/course';
import { useNavigationProgressContext } from '@progress';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function usePrefetchCourse(id: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { closeSidebar } = useDashboardContext();
  const { startNavigationProgress, finishNavigationProgress } =
    useNavigationProgressContext();

  return async function prefetchCourse() {
    startNavigationProgress();
    await queryClient.prefetchQuery({
      queryKey: [COURSE, id],
      queryFn: () => getCourse({ id }),
    });
    finishNavigationProgress();
    closeSidebar();
    navigate(`/pelajaran/${id}`);
  };
}

export default usePrefetchCourse;
