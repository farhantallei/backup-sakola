import { Loader } from '@app/components';
import { FullScreen } from '@app/layouts';
import { getCourses } from '@app/services/course';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['courses', page],
    queryFn: () => getCourses({ page, limit }),
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    if (data?.page.next! > 0) {
      queryClient.prefetchQuery({
        queryKey: ['courses', page + 1],
        queryFn: () => getCourses({ page: page + 1, limit }),
      });
    }
  }, [page]);

  return (
    <FullScreen>
      {/* {isError ? <div>{error}</div> : null}
      {isLoading ? <div>Loading</div> : null}
      <button type="button" title="button" onClick={logout}>
        Logout
      </button> */}
      <div className="max-w-screen-sm w-full space-y-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          {!data || isLoading ? (
            <Loader />
          ) : (
            <>
              <ul role="list" className="divide-y divide-gray-200">
                {data.courses.map((course) => (
                  <li>
                    <a className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            Back End Developer
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Fulltime
                            </span>
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
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    {' '}
                    Previous{' '}
                  </a>
                  <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    {' '}
                    Next{' '}
                  </a>
                </div>
                <div className="hidden ss:flex flex-1 items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing<span className="font-medium">{` ${page} `}</span>
                      to
                      <span className="font-medium">{` ${data.page.total} `}</span>
                      of
                      <span className="font-medium">{` ${data.count.total} `}</span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination">
                      <button
                        disabled={data.page.prev <= 0}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-300">
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true">
                          <path
                            fill-rule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <a
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        {' '}
                        1{' '}
                      </a>
                      <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        {' '}
                        2{' '}
                      </a>
                      <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                        {' '}
                        3{' '}
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                        {' '}
                        ...{' '}
                      </span>
                      <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                        {' '}
                        8{' '}
                      </a>
                      <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        {' '}
                        9{' '}
                      </a>
                      <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        {' '}
                        10{' '}
                      </a>
                      <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true">
                          <path
                            fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </a>
                    </nav>
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

// function Pagination({ total, active }: { total: number; active: number }) {
//   const indicators: JSX.Element[] = []

//   const activeCx = classNames(
//     'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
//   );
//   const inactiveCx = classNames(
//     'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//   );

//   for(let i = 0; i < total; i++) {
//     indicators.push()
//   }

//   return (
//     <>
//     <a
//       className={classNames(
//         'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
//       )}>
//       {` ${page} `}
//     </a>
//     </>
//   );
// }
