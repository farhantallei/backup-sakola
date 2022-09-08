import { COURSES, Filter } from '@app/constants/queryKey';
import { useUpdateEffect } from '@app/hooks';
import { GetCourseCountResponse } from '@app/types/rest';
import { UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

interface PrefetchCourseListParams<T> {
  key: string;
  filter: Filter;
  currentPage: number;
  limit: number;
  courseList: UseQueryResult<T>;
  getCourses: (data: { page: number; limit: number }) => Promise<T>;
}

function usePrefetchCourseList<T extends GetCourseCountResponse>({
  key,
  filter,
  currentPage: page,
  limit,
  courseList,
  getCourses,
}: PrefetchCourseListParams<T>) {
  const queryClient = useQueryClient();

  useUpdateEffect(() => {
    queryClient.removeQueries({
      queryKey: [COURSES, { filter }],
    });
  }, [limit]);

  const prefetchOnMount = useCallback(
    (whichPage: 'prev' | 'next') => {
      const currentPage: Record<typeof whichPage, boolean> = {
        prev: page <= 1,
        next: page >= limit,
      };

      const siblingPage: Record<typeof whichPage, number> = {
        prev: page - 1,
        next: page + 1,
      };

      if (currentPage[whichPage]) return;
      console.log(page, whichPage);

      const siblingPageKey = [key, { filter }, siblingPage[whichPage]];
      const siblingPageCache = queryClient.getQueryCache().find(siblingPageKey);

      if (siblingPageCache) return;
      queryClient.prefetchQuery({
        queryKey: siblingPageKey,
        queryFn: () => getCourses({ page: siblingPage[whichPage], limit }),
        cacheTime: Infinity,
        retry: 3,
      });
    },
    [limit]
  );

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
    [page, limit]
  );

  useEffect(() => {
    prefetchOnMount('prev');
    prefetchOnMount('next');
  }, [limit]);

  useEffect(() => {
    prefetchOnPage('prev');
    prefetchOnPage('next');
  }, [page, limit]);
}

export default usePrefetchCourseList;
