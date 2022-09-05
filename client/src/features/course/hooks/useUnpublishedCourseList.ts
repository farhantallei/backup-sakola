import { COURSES, UNPUBLISHED } from '@app/constants/queryKey';
import { getUnpublishedCourses } from '@app/services/course';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

function useUnpublishedCourseList(page: number, limit: number) {
  const queryClient = useQueryClient();

  const courseList = useQuery({
    queryKey: [COURSES, page, { filter: UNPUBLISHED }],
    queryFn: () => getUnpublishedCourses({ page, limit }),
    keepPreviousData: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    const nextPage = page + 1;
    const nextPageKey = [COURSES, nextPage, { filter: UNPUBLISHED }];

    queryClient.prefetchQuery({
      queryKey: nextPageKey,
      queryFn: () => getUnpublishedCourses({ page: nextPage, limit }),
      cacheTime: Infinity,
      retry: 3,
    });
  }, []);

  useEffect(() => {
    if (!courseList.data) return;

    const prevPage = page - 1;
    const prevPageKey = [COURSES, prevPage, { filter: UNPUBLISHED }];
    const prevPageCache = queryClient.getQueryCache().find(prevPageKey);

    if (prevPageCache) return;
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: prevPageKey,
        queryFn: () => getUnpublishedCourses({ page: prevPage, limit }),
        cacheTime: Infinity,
      });
    }
  }, [page]);

  useEffect(() => {
    if (!courseList.data) return;

    const nextPage = page + 1;
    const nextPageKey = [COURSES, nextPage, { filter: UNPUBLISHED }];
    const nextPageCache = queryClient.getQueryCache().find(nextPageKey);

    if (nextPageCache) return;
    if (page < courseList.data.page.total) {
      queryClient.prefetchQuery({
        queryKey: nextPageKey,
        queryFn: () => getUnpublishedCourses({ page: nextPage, limit }),
        cacheTime: Infinity,
      });
    }
  }, [page]);

  return courseList;
}

export default useUnpublishedCourseList;
