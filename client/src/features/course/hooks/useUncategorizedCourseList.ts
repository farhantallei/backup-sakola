import { COURSES, UNCATEGORIZED } from '@app/constants/queryKey';
import { getUncategorizedCourses } from '@app/services/course';
import { useQuery } from '@tanstack/react-query';
import usePrefetchCourseList from './usePrefetchCourseList';

function useUncategorizedCourseList(page: number, limit: number) {
  const courseList = useQuery({
    queryKey: [COURSES, page, { filter: UNCATEGORIZED }],
    queryFn: () => getUncategorizedCourses({ page, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  usePrefetchCourseList({
    key: COURSES,
    filter: UNCATEGORIZED,
    page,
    limit,
    courseList,
    getCourses: getUncategorizedCourses,
  });

  return courseList;
}

export default useUncategorizedCourseList;
