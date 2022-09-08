import { usePagination } from '../hooks';
import NavControl from './NavControl';
import PageControl from './PageControl';

interface PaginationProps {
  onPageChange: (page: number) => void;
  pageTotal: number;
  boundaryCount?: number;
  siblingCount?: number;
  currentPage: number;
}

function Pagination({
  onPageChange,
  pageTotal,
  boundaryCount = 1,
  siblingCount = 1,
  currentPage,
}: PaginationProps) {
  const paginationRange = usePagination({
    pageTotal,
    boundaryCount,
    siblingCount,
    currentPage,
  });

  function prevHandle() {
    onPageChange(currentPage - 1);
  }

  function nextHandle() {
    onPageChange(currentPage + 1);
  }

  function pageHandle(page: number) {
    onPageChange(page);
  }

  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
      <NavControl nav="prev" disabled={currentPage <= 1} onClick={prevHandle} />
      {paginationRange.map((page, index) => {
        if (page.type === 'dots') {
          return <PageControl key={index} type="dots" />;
        }

        if (page.type === 'boundary') {
          return (
            <PageControl
              key={index}
              type="boundary"
              page={page.number}
              active={currentPage === page.number}
              onClick={() => pageHandle(page.number)}
            />
          );
        }

        if (page.type === 'sibling') {
          return (
            <PageControl
              key={index}
              type="sibling"
              page={page.number}
              active={currentPage === page.number}
              onClick={() => pageHandle(page.number)}
            />
          );
        }

        return (
          <PageControl
            key={index}
            type="number"
            page={page.number}
            active={currentPage === page.number}
            onClick={() => pageHandle(page.number)}
          />
        );
      })}
      <NavControl
        nav="next"
        disabled={currentPage >= pageTotal}
        onClick={nextHandle}
      />
    </nav>
  );
}

export default Pagination;
