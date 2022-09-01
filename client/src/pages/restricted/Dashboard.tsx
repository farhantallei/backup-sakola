import { Loader } from '@app/components';
import { FullScreen } from '@app/layouts';
import { Badge } from '@course/components';
import { useCourseList } from '@course/hooks';
import { Pagination } from '@pagination/components';
import { useState } from 'react';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { data, isLoading, isError, error } = useCourseList(currentPage, limit);

  return (
    <FullScreen>
      <div className="max-w-screen-sm w-full space-y-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            error instanceof Error ? (
              <span>{error.message}</span>
            ) : (
              <span>Something goes wrong. Please refresh your page.</span>
            )
          ) : (
            <>
              <ul role="list" className="divide-y divide-gray-200">
                {data.courses.map((course) => (
                  <li key={course.id}>
                    <a className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            {course.title}
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <Badge type="new" />
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">
                              Engineering
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            Remote
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between ss:hidden">
                  <button
                    type="button"
                    disabled={data.page.prev <= 0}
                    onClick={() => {
                      if (data.page.prev > 0)
                        setCurrentPage((prevPage) => prevPage - 1);
                    }}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300">
                    Previous
                  </button>
                  <div className="self-center text-sm text-gray-700 ">
                    <span className="font-semibold">{currentPage}</span>
                    {' / '}
                    <span className="font-semibold">{data.page.total}</span>
                  </div>
                  <button
                    type="button"
                    disabled={data.page.next <= 0}
                    onClick={() => {
                      if (data.page.next > 0)
                        setCurrentPage((prevPage) => prevPage + 1);
                    }}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300">
                    Next
                  </button>
                </div>
                <div className="hidden ss:flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing
                      <span className="font-medium">{` ${
                        limit * (currentPage - 1) + 1
                      } `}</span>
                      to
                      <span className="font-medium">{` ${Math.min(
                        data.count.total,
                        limit * currentPage
                      )} `}</span>
                      of
                      <span className="font-medium">{` ${data.count.total} `}</span>
                      results
                    </p>
                  </div>
                  <div>
                    <Pagination
                      onPageChange={(page) => setCurrentPage(page)}
                      totalPageCount={data.page.total}
                      currentPage={currentPage}
                      prevPageCount={data.page.prev}
                      nextPageCount={data.page.next}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </FullScreen>
  );
}

export default Dashboard;
