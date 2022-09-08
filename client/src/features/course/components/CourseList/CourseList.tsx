import CourseListController from './CourseListController';
import CourseListItem from './CourseListItem';

interface CourseListProps {
  countTotal: number;
  pageTotal: number;
  children?: React.ReactNode;
}

function CourseList({ countTotal, pageTotal, children }: CourseListProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {children}
      </ul>
      <CourseListController countTotal={countTotal} pageTotal={pageTotal} />
    </div>
  );
}

CourseList.Item = CourseListItem;
export default CourseList;
