import { Title } from '@app/components/typography';
import { UNPUBLISHED } from '@app/constants/queryKey';
import { getUnpublishedCourses } from '@app/services/course';
import { CourseList } from '@course/components';
import CourseListContext, {
  CourseListContextValue,
} from '@course/context/CourseListContext';
import { useCourseList, usePrefetchCourse } from '@course/hooks';
import { usePaginationQuery } from '@pagination/hooks';
import { useFetchingNavigationProgress } from '@progress/hooks';

function Home() {
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
    getCourses: getUnpublishedCourses,
    currentPage: pageNumber,
    setCurrentPage,
    limit: limitNumber,
    setLimit,
    filter: UNPUBLISHED,
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
          {data.courses.map(({ id, subject, ...course }) => (
            <CourseList.Item
              key={id}
              subject={subject?.name}
              category={subject?.category}
              onClick={() => prefetchCourse(id)}
              {...course}
            />
          ))}
        </CourseList>
      </CourseListContext.Provider>
    </div>
  );
}

export default Home;
