import { GetCourseCountResponse } from '@app/types/rest';
import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

interface PrefetchCourseListParams<T> {
  key: string;
  filter: string;
  page: number;
  limit: number;
  courseList: UseQueryResult<T>;
  getCourses: (data: { page: number; limit: number }) => Promise<T>;
}

function usePrefetchCourseList<T extends GetCourseCountResponse>({
  key,
  filter,
  page,
  limit,
  courseList,
  getCourses,
}: PrefetchCourseListParams<T>) {
  const queryClient = useQueryClient();

  const prefetchOnMount = useCallback((whichPage: 'prev' | 'next') => {
    const currentPage: Record<typeof whichPage, boolean> = {
      prev: page <= 1,
      next: page >= limit,
    };

    const siblingPage: Record<typeof whichPage, number> = {
      prev: page - 1,
      next: page + 1,
    };

    if (currentPage[whichPage]) return;

    const siblingPageKey = [key, { filter }, siblingPage[whichPage]];
    const siblingPageCache = queryClient.getQueryCache().find(siblingPageKey);

    if (siblingPageCache) return;
    queryClient.prefetchQuery({
      queryKey: siblingPageKey,
      queryFn: () => getCourses({ page: siblingPage[whichPage], limit }),
      retry: 3,
    });
  }, []);

  const prefetchOnPage = useCallback(
    (whichPage: 'prev' | 'next') => {
      if (!courseList.data) return;

      const currentPage: Record<typeof whichPage, boolean> = {
        prev: page > 1,
        next: page < courseList.data.page.total,
      };

      const siblingPage: Record<typeof whichPage, number> = {
        prev: page - 1,
        next: page + 1,
      };

      const siblingPageKey = [key, { filter }, siblingPage[whichPage]];
      const siblingPageCache = queryClient.getQueryCache().find(siblingPageKey);

      if (siblingPageCache) return;
      if (currentPage[whichPage]) {
        queryClient.prefetchQuery({
          queryKey: siblingPageKey,
          queryFn: () => getCourses({ page: siblingPage[whichPage], limit }),
          cacheTime: Infinity,
        });
      }
    },
    [page]
  );

  useEffect(() => {
    prefetchOnMount('prev');
    prefetchOnMount('next');
  }, []);

  useEffect(() => {
    prefetchOnPage('prev');
    prefetchOnPage('next');
  }, [page]);
}

export default usePrefetchCourseList;
