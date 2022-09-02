import { RouteHandlerTypebox } from '../../../types';
import { GetCoursesTSchema } from './course.schemas';
import { countCourses, getCourses } from './course.services';

export const GetCoursesHandler: RouteHandlerTypebox<GetCoursesTSchema> = async (
  request,
  reply
) => {
  const { page, limit } = request.query;
  const authorId = request.author.id;

  const courseLength = await countCourses(reply, { authorId });
  if (limit > courseLength)
    return reply.badRequest(`querystring/limit must be <= ${courseLength}`);

  const maxPage = Math.ceil(courseLength / limit);
  if (page > maxPage)
    return reply.badRequest(`querystring/page must be <= ${maxPage}`);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const courses = await getCourses(reply, {
    authorId,
    skip: startIndex,
    take: limit,
  });

  const prevCount = endIndex - limit;
  const nextCount = Math.max(0, courseLength - endIndex);

  return {
    count: {
      total: courseLength,
      prev: prevCount,
      next: nextCount,
    },
    page: {
      total: maxPage,
      prev: prevCount / limit,
      next: Math.ceil(nextCount / limit),
    },
    courses: courses.map(
      ({ createdAt, updatedAt, publishedAt, ...course }) => ({
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        publishedAt: publishedAt?.toISOString() || null,
        ...course,
      })
    ),
  };
};
