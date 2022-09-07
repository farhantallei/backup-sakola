import { COURSES } from '@app/constants/queryKey';
import { useUpdateEffect } from '@app/hooks';
import { isNumeric } from '@app/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function usePaginationQuery<T>(filter: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const pageQuery = searchParams.get('page');
  const limitQuery = searchParams.get('limit');

  const pageNumber = useMemo((): number => {
    if (pageQuery == null || !isNumeric(pageQuery) || pageQuery === '0')
      return 1;
    return parseInt(pageQuery);
  }, [pageQuery]);

  const limitNumber = useMemo((): number => {
    if (limitQuery == null || !isNumeric(limitQuery) || limitQuery === '0')
      return 4;
    return parseInt(limitQuery);
  }, [limitQuery]);

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [limit, setLimit] = useState(limitNumber);

  useEffect(() => {
    setSearchParams(
      { page: `${currentPage}`, limit: `${limit}` },
      { replace: true }
    );
  }, [currentPage, limit]);

  useEffect(() => {
    setCurrentPage(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    setLimit(limitNumber);
  }, [limitNumber]);

  // FIXME: Debug me please.
  useUpdateEffect(() => {
    queryClient.prefetchQuery({
      queryKey: [COURSES, { filter }, currentPage],
    });
    queryClient.removeQueries({
      queryKey: [COURSES, { filter }],
    });
  }, [limit]);

  return { currentPage, setCurrentPage, limit, setLimit };
}

export default usePaginationQuery;
