import { CourseList } from '@course/components';
import { useUnpublishedCourseList } from '@course/hooks';
import { useState } from 'react';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { data, status, error } = useUnpublishedCourseList(currentPage, limit);

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
        {data?.courses.map(({ subject, ...course }) => (
          <CourseList.Item
            key={course.id}
            subject={subject?.name}
            category={subject?.category}
            {...course}
          />
        )) || null}
      </CourseList>
    </div>
  );
}

export default Home;
