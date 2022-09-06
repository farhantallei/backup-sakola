import { CourseList } from '@course/components';
import { usePrefetchCourse, useUncategorizedCourseList } from '@course/hooks';
import { useFetchingNavigationProgress } from '@progress/hooks';
import { useState } from 'react';

function Draft() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const prefetchCourse = usePrefetchCourse();
  const { data, status, error, isFetching } = useUncategorizedCourseList(
    currentPage,
    limit
  );

  useFetchingNavigationProgress(isFetching);

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
        {data?.courses.map(({ id, ...course }) => (
          <CourseList.Item
            key={id}
            onClick={() => prefetchCourse(id)}
            {...course}
          />
        )) || null}
      </CourseList>
    </div>
  );
}

export default Draft;
