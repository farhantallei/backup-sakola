import { isNumeric } from '@app/utils';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function usePaginationQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
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

  return { currentPage, setCurrentPage, limit, setLimit };
}

export default usePaginationQuery;
