import CourseListController from './CourseListController';
import CourseListItem from './CourseListItem';

interface CourseListProps {
  countTotal: number;
  page: {
    total: number;
    prev: number;
    next: number;
  };
  children?: React.ReactNode;
}

function CourseList({ countTotal, page, children }: CourseListProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {children}
      </ul>
      <CourseListController
        countTotal={countTotal}
        page={{
          total: page.total,
          prev: page.prev,
          next: page.next,
        }}
      />
    </div>
  );
}

CourseList.Item = CourseListItem;
export default CourseList;
