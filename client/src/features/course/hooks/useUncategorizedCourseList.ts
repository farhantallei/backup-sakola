import { COURSES, UNCATEGORIZED } from '@app/constants/queryKey';
import { getUncategorizedCourses } from '@app/services/course';
import { useQuery } from '@tanstack/react-query';
import usePrefetchCourseList from './usePrefetchCourseList';

function useUncategorizedCourseList(
  page: number,
  setPage: (page: number) => void,
  limit: number,
  setLimit: (limit: number) => void
) {
  const courseList = useQuery({
    queryKey: [COURSES, { filter: UNCATEGORIZED }, page],
    queryFn: () => getUncategorizedCourses({ page, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess: (data) => {
      setPage(data.page.current);
      setLimit(data.limit);
    },
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
