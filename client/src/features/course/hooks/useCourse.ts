import { COURSE } from '@app/constants/queryKey';
import { getCourse } from '@app/services/course';
import { useQuery } from '@tanstack/react-query';

function useCourse(id: string) {
  return useQuery({
    queryKey: [COURSE, id],
    queryFn: () => getCourse({ id }),
  });
}

export default useCourse;
