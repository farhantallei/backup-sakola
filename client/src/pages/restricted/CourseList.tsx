import { Title } from '@app/components/typography';
import { Filter } from '@app/constants/queryKey';
import { GetCourseListResponse, GetCoursesRequest } from '@app/types/rest';
import { Controller, Feed } from '@course/components';
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

interface CourseListProps<T> {
  getCourses: (data: GetCoursesRequest) => Promise<T>;
  filter: Filter;
}

function CourseList<T extends GetCourseListResponse>({
  getCourses,
  filter,
}: CourseListProps<T>) {
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
    getCourses,
    currentPage: pageNumber,
    setCurrentPage,
    limit: limitNumber,
    setLimit,
    filter,
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
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <ul role="list" className="divide-y divide-gray-200">
            {data.courses.map((item) => (
              <Feed
                key={item.id}
                title={item.title}
                thumbnailUrl={item.thumbnailUrl}
                subject={item?.subject?.name}
                level={item.level}
                published={item.published}
                status={item.status}
                category={item?.subject?.category}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                publishedAt={item.publishedAt || undefined}
                onClick={() => prefetchCourse(item.id)}
              />
            ))}
          </ul>
          <Controller
            countTotal={data.count.total}
            pageTotal={data.page.total}
          />
        </div>
      </CourseListContext.Provider>
    </div>
  );
}

export default CourseList;
