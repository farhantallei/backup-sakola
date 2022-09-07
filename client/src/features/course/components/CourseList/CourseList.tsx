import CourseListController from './CourseListController';
import CourseListItem from './CourseListItem';

interface CourseListProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
  pageCount: {
    total: number;
    prev: number;
    next: number;
  };
  itemCount: number;
}

function CourseList({ pageCount, itemCount, children }: CourseListProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {children}
      </ul>
      <CourseListController
        pageCount={{
          total: pageCount.total,
          prev: pageCount.prev,
          next: pageCount.next,
        }}
        itemCount={itemCount}
      />
    </div>
  );
}

CourseList.Item = CourseListItem;
export default CourseList;
