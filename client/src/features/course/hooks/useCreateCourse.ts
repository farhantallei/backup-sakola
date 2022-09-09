import { COURSE } from '@app/constants/queryKey';
import { useDashboardContext } from '@app/context/DashboardContext';
import { createCourse, getCourse } from '@app/services/course';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

function useCreateCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { closeSidebar } = useDashboardContext();

  const fromDashboard =
    location.pathname.startsWith('/beranda') ||
    location.pathname.startsWith('/draf');

  return useMutation({
    mutationFn: createCourse,
    onSuccess: async ({ id }) => {
      await queryClient.prefetchQuery({
        queryKey: [COURSE, id],
        queryFn: () => getCourse({ id }),
      });
      closeSidebar();
      navigate(`/pelajaran/${id}`, { state: fromDashboard && location });
    },
  });
}

export default useCreateCourse;
