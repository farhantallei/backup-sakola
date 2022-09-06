import { Loader } from '@app/components/ui';
import {
  CourseListContext,
  CourseListContextValue,
} from './CourseList.context';
import CourseListController from './CourseListController';
import CourseListItem from './CourseListItem';

interface CourseListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
  status: 'loading' | 'error' | 'success';
  error: unknown;
  pageCount: {
    total?: number;
    prev?: number;
    next?: number;
  };
  itemCount: {
    total?: number;
    prev?: number;
    next?: number;
  };
}

function CourseList({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  status,
  error,
  pageCount,
  itemCount,
  children,
}: CourseListProps) {
  const value: CourseListContextValue = {
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
  };

  return (
    <CourseListContext.Provider value={value}>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        {status === 'loading' ? (
          <Loader className="dark:fill-sky-500" />
        ) : status === 'error' ? (
          error instanceof Error ? (
            <span>{error.message}</span>
          ) : (
            <span>Something goes wrong. Please refresh your page.</span>
          )
        ) : (
          <>
            <ul role="list" className="divide-y divide-gray-200">
              {children}
            </ul>
            <CourseListController
              pageCount={{
                total: pageCount.total!,
                prev: pageCount.prev!,
                next: pageCount.next!,
              }}
              itemCount={{
                total: itemCount.total!,
                prev: itemCount.prev!,
                next: itemCount.next!,
              }}
            />
          </>
        )}
      </div>
    </CourseListContext.Provider>
  );
}

CourseList.Item = CourseListItem;
export default CourseList;
