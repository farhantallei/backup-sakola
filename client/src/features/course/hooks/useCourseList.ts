import { COURSES, Filter } from '@app/constants/queryKey';
import { GetCourseCountResponse, GetCoursesRequest } from '@app/types/rest';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import usePrefetchCourseList from './usePrefetchCourseList';

interface CourseListParams<T> {
  getCourses: (data: GetCoursesRequest) => Promise<T>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  filter: Filter;
}

function useCourseList<T extends GetCourseCountResponse>({
  getCourses,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  filter,
}: CourseListParams<T>): UseQueryResult<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const courseList = useQuery({
    queryKey: [COURSES, { filter }, currentPage],
    queryFn: () => getCourses({ page: currentPage, limit }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    onSuccess: (data) => {
      setCurrentPage(data.page.current);
      setLimit(data.limit);
      setSearchParams({ page: `${data.page.current}`, limit: `${data.limit}` });
    },
  });

  usePrefetchCourseList({
    key: COURSES,
    filter,
    currentPage,
    limit,
    data: courseList.data,
    getCourses,
  });

  return courseList as UseQueryResult<T>;
}

export default useCourseList;
