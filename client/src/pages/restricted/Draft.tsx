import { CourseList } from '@course/components';
import { useUncategorizedCourseList } from '@course/hooks';
import { useState } from 'react';

function Draft() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { data, status, error } = useUncategorizedCourseList(
    currentPage,
    limit
  );

  return (
    <div className="flex flex-col justify-center h-full space-y-8">
      <CourseList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        setLimit={setLimit}
        status={status}
        error={error}
        pageCount={{
          total: data?.page.total,
          prev: data?.page.prev,
          next: data?.page.next,
        }}
        itemCount={{
          total: data?.count.total,
          prev: data?.count.prev,
          next: data?.count.next,
        }}>
        {data?.courses.map(({ ...course }) => (
          <CourseList.Item key={course.id} {...course} />
        )) || null}
      </CourseList>
    </div>
  );
}

export default Draft;
