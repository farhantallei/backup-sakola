import { getCourses } from '@app/services/course';
import { GetCoursesResponse } from '@app/types/rest';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

type CourseListResult =
  | { data: undefined; error: null; isError: boolean; isLoading: true }
  | { data: undefined; error: string; isError: true; isLoading: false }
  | { data: GetCoursesResponse; error: null; isError: false; isLoading: false };

function useCourseList(currentPage: number, limit: number) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['courses', currentPage],
    queryFn: () => getCourses({ page: currentPage, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    const nextPage = currentPage + 1;
    const nextPageKey = ['courses', nextPage];

    queryClient.prefetchQuery({
      queryKey: nextPageKey,
      queryFn: () => getCourses({ page: nextPage, limit }),
      cacheTime: Infinity,
      retry: 3,
    });
  }, []);

  useEffect(() => {
    if (!data) return;

    const prevPage = currentPage - 1;
    const prevPageKey = ['courses', prevPage];
    const prevPageCache = queryClient.getQueryCache().find(prevPageKey);

    if (prevPageCache) return;
    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: prevPageKey,
        queryFn: () => getCourses({ page: prevPage, limit }),
        cacheTime: Infinity,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (!data) return;

    const nextPage = currentPage + 1;
    const nextPageKey = ['courses', nextPage];
    const nextPageCache = queryClient.getQueryCache().find(nextPageKey);

    if (nextPageCache) return;
    if (currentPage < data.page.total) {
      queryClient.prefetchQuery({
        queryKey: nextPageKey,
        queryFn: () => getCourses({ page: nextPage, limit }),
        cacheTime: Infinity,
      });
    }
  }, [currentPage]);

  return {
    data,
    error,
    isError,
    isLoading,
  } as CourseListResult;
}

export default useCourseList;
