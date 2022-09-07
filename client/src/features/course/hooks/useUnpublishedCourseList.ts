import { COURSES, UNPUBLISHED } from '@app/constants/queryKey';
import { getUnpublishedCourses } from '@app/services/course';
import { useQuery } from '@tanstack/react-query';
import usePrefetchCourseList from './usePrefetchCourseList';

function useUnpublishedCourseList(
  page: number,
  setPage: (page: number) => void,
  limit: number,
  setLimit: (limit: number) => void
) {
  const courseList = useQuery({
    queryKey: [COURSES, page, { filter: UNPUBLISHED }],
    queryFn: () => getUnpublishedCourses({ page, limit }),
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
    filter: UNPUBLISHED,
    page,
    limit,
    courseList,
    getCourses: getUnpublishedCourses,
  });

  return courseList;
}

export default useUnpublishedCourseList;
