import { Pagination } from '@pagination/components';
import { useCourseListContext } from './CourseList.context';

function CourseListController({
  pageCount,
  itemCount,
}: {
  pageCount: {
    total: number;
    prev: number;
    next: number;
  };
  itemCount: {
    total: number;
    prev: number;
    next: number;
  };
}) {
  const { currentPage, setCurrentPage, limit } = useCourseListContext();

  function prevHandle() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function nextHandle() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function pageHandle(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between ss:hidden">
        <button
          type="button"
          disabled={pageCount.prev <= 0}
          onClick={prevHandle}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300">
          Previous
        </button>
        <div className="self-center text-sm text-gray-700 ">
          <span className="font-semibold">{currentPage}</span>
          {' / '}
          <span className="font-semibold">{pageCount.total}</span>
        </div>
        <button
          type="button"
          disabled={pageCount.next <= 0}
          onClick={nextHandle}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300">
          Next
        </button>
      </div>
      <div className="hidden ss:flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">{` ${
              itemCount.total > 0 ? limit * (currentPage - 1) + 1 : 0
            } `}</span>
            to
            <span className="font-medium">{` ${Math.min(
              itemCount.total,
              limit * currentPage
            )} `}</span>
            of
            <span className="font-medium">{` ${itemCount.total} `}</span>
            results
          </p>
        </div>
        <div>
          <Pagination
            onPageChange={pageHandle}
            totalPageCount={pageCount.total}
            currentPage={currentPage}
            prevPageCount={pageCount.prev}
            nextPageCount={pageCount.next}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseListController;