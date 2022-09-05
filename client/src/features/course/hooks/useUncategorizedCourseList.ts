import { COURSES, UNCATEGORIZED } from '@app/constants/queryKey';
import { getUncategorizedCourses } from '@app/services/course';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

function useUncategorizedCourseList(page: number, limit: number) {
  const queryClient = useQueryClient();

  const courseList = useQuery({
    queryKey: [COURSES, page, { filter: UNCATEGORIZED }],
    queryFn: () => getUncategorizedCourses({ page, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
  });

  useEffect(() => {
    const nextPage = page + 1;
    const nextPageKey = [COURSES, nextPage, { filter: UNCATEGORIZED }];

    queryClient.prefetchQuery({
      queryKey: nextPageKey,
      queryFn: () => getUncategorizedCourses({ page: nextPage, limit }),
      retry: 3,
    });
  }, []);

  useEffect(() => {
    if (!courseList.data) return;

    const prevPage = page - 1;
    const prevPageKey = [COURSES, prevPage, { filter: UNCATEGORIZED }];
    const prevPageCache = queryClient.getQueryCache().find(prevPageKey);

    if (prevPageCache) return;
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: prevPageKey,
        queryFn: () => getUncategorizedCourses({ page: prevPage, limit }),
        cacheTime: Infinity,
      });
    }
  }, [page]);

  useEffect(() => {
    if (!courseList.data) return;

    const nextPage = page + 1;
    const nextPageKey = [COURSES, nextPage, { filter: UNCATEGORIZED }];
    const nextPageCache = queryClient.getQueryCache().find(nextPageKey);

    if (nextPageCache) return;
    if (page < courseList.data.page.total) {
      queryClient.prefetchQuery({
        queryKey: nextPageKey,
        queryFn: () => getUncategorizedCourses({ page: nextPage, limit }),
        cacheTime: Infinity,
      });
    }
  }, [page]);

  return courseList;
}

export default useUncategorizedCourseList;
