import { Title } from '@app/components/typography';
import { UNCATEGORIZED } from '@app/constants/queryKey';
import { CourseList } from '@course/components';
import CourseListContext, {
  CourseListContextValue,
} from '@course/context/CourseListContext';
import { usePrefetchCourse, useUncategorizedCourseList } from '@course/hooks';
import { usePaginationQuery } from '@pagination/hooks';
import { useFetchingNavigationProgress } from '@progress/hooks';

// FIXME: Save limit state to localstorage instead. But the query will controlling the state of the localstorage
// Example:
// The url is: http://localhost:1234/draf?page=1 or http://localhost:1234/draf
// Then the limit will automatically get from the localstorage and page is set to default which is 1
// If the url is: http://localhost:1234/draf?page=1&limit=5
// Then we will take the limit from the query and set it to the localstorage.
function Draft() {
  const { currentPage, setCurrentPage, limit, setLimit } =
    usePaginationQuery(UNCATEGORIZED);
  const prefetchCourse = usePrefetchCourse();
  const { data, isLoading, isError, error, isFetching } =
    useUncategorizedCourseList(currentPage, setCurrentPage, limit, setLimit);

  useFetchingNavigationProgress(isLoading);
  useFetchingNavigationProgress(isFetching);

  const value: CourseListContextValue = {
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
  };

  if (isLoading) return null;
  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        {error instanceof Error ? (
          <Title order={2} className="text-red-500">
            {error.message}
          </Title>
        ) : (
          <Title order={2} className="text-red-500">
            Something goes wrong. Please refresh your page.
          </Title>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full space-y-8">
      <CourseListContext.Provider value={value}>
        <CourseList
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          pageCount={{
            total: data.page.total,
            prev: data.page.prev,
            next: data.page.next,
          }}
          itemCount={data.count.total}>
          {data.courses.map(({ id, ...course }) => (
            <CourseList.Item
              key={id}
              onClick={() => prefetchCourse(id)}
              {...course}
            />
          )) || null}
        </CourseList>
      </CourseListContext.Provider>
    </div>
  );
}

export default Draft;
