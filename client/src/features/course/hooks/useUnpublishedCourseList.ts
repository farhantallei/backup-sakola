import { COURSES, UNPUBLISHED } from '@app/constants/queryKey';
import { getUnpublishedCourses } from '@app/services/course';
import { useQuery } from '@tanstack/react-query';
import usePrefetchCourseList from './usePrefetchCourseList';

function useUnpublishedCourseList(page: number, limit: number) {
  const courseList = useQuery({
    queryKey: [COURSES, page, { filter: UNPUBLISHED }],
    queryFn: () => getUnpublishedCourses({ page, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  usePrefetchCourseList({
    key: COURSES,
    filter: UNPUBLISHED,
    page,
    limit,
    courseList,
    getCourses: getUnpublishedCourses,
  });

  return courseList;
}

export default useUnpublishedCourseList;
