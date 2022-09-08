import { useCourseListContext } from '@course/context/CourseListContext';
import { Pagination } from '@pagination/components';
import { useSearchParams } from 'react-router-dom';

function CourseListController({
  countTotal,
  pageTotal,
}: {
  countTotal: number;
  pageTotal: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageNumber, limitNumber, currentPage, limit } =
    useCourseListContext();

  function prevHandle() {
    setSearchParams({
      page: `${Math.max(1, pageNumber - 1)}`,
      limit: `${limitNumber}`,
    });
  }

  function nextHandle() {
    setSearchParams({
      page: `${Math.min(pageTotal, pageNumber + 1)}`,
      limit: `${limitNumber}`,
    });
  }

  function pageHandle(page: number) {
    setSearchParams({ page: `${page}`, limit: `${limitNumber}` });
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between ss:hidden">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={prevHandle}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300">
          Previous
        </button>
        <div className="self-center text-sm text-gray-700 ">
          <span className="font-semibold">{currentPage}</span>
          {' / '}
          <span className="font-semibold">{pageTotal}</span>
        </div>
        <button
          type="button"
          disabled={currentPage >= pageTotal}
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
              countTotal > 0 ? limit * (currentPage - 1) + 1 : 0
            } `}</span>
            to
            <span className="font-medium">{` ${Math.min(
              countTotal,
              limit * currentPage
            )} `}</span>
            of
            <span className="font-medium">{` ${countTotal} `}</span>
            results
          </p>
        </div>
        <div>
          <Pagination
            prevHandle={prevHandle}
            nextHandle={nextHandle}
            pageHandle={pageHandle}
            pageTotal={pageTotal}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseListController;
