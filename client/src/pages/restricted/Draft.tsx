import { Title } from '@app/components/typography';
import { UNCATEGORIZED } from '@app/constants/queryKey';
import { getUncategorizedCourses } from '@app/services/course';
import { CourseList } from '@course/components';
import CourseListContext, {
  CourseListContextValue,
} from '@course/context/CourseListContext';
import { useCourseList, usePrefetchCourse } from '@course/hooks';
import { usePaginationQuery } from '@pagination/hooks';
import { useFetchingNavigationProgress } from '@progress/hooks';

/** FIXME: Save limit state to localstorage instead. But the query will controlling the state of the localstorage
 * Example:
 * The url is: http://localhost:1234/draf?page=1 or http://localhost:1234/draf
 * Then the limit will automatically get from the localstorage and page is set to default which is 1
 * If the url is: http://localhost:1234/draf?page=1&limit=5
 * Then we will take the limit from the query and set it to the localstorage.
 */

function Draft() {
  const {
    pageNumber,
    limitNumber,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
  } = usePaginationQuery();
  const prefetchCourse = usePrefetchCourse();
  const { data, isLoading, isError, error, isFetching } = useCourseList({
    getCourses: getUncategorizedCourses,
    currentPage: pageNumber,
    setCurrentPage,
    limit: limitNumber,
    setLimit,
    filter: UNCATEGORIZED,
  });

  useFetchingNavigationProgress(isFetching);

  const value: CourseListContextValue = {
    pageNumber,
    limitNumber,
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
        <CourseList countTotal={data.count.total} pageTotal={data.page.total}>
          {data.courses.map(({ id, ...course }) => (
            <CourseList.Item
              key={id}
              onClick={() => prefetchCourse(id)}
              {...course}
            />
          ))}
        </CourseList>
      </CourseListContext.Provider>
    </div>
  );
}

export default Draft;
