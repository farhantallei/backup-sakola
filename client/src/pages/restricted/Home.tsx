import { CourseList } from '@course/components';
import { usePrefetchCourse, useUnpublishedCourseList } from '@course/hooks';
import { useFetchingNavigationProgress } from '@progress/hooks';
import { useState } from 'react';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const prefetchCourse = usePrefetchCourse();
  const { data, status, error, isFetching } = useUnpublishedCourseList(
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
        {data?.courses.map(({ id, subject, ...course }) => (
          <CourseList.Item
            key={id}
            subject={subject?.name}
            category={subject?.category}
            onClick={() => prefetchCourse(id)}
            {...course}
          />
        )) || null}
      </CourseList>
    </div>
  );
}

export default Home;
