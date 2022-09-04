import { RouteHandlerTypebox } from '../../../types';
import { GetUnpublishedCoursesTSchema } from './course.schemas';
import {
  countUnpublishedCourses,
  getUnpublishedCourses,
} from './course.services';

export const GetUnpublishedCoursesHandler: RouteHandlerTypebox<
  GetUnpublishedCoursesTSchema
> = async (request, reply) => {
  const { page, limit } = request.query;
  const authorId = request.author.id;

  const unpublishedCourseLength = await countUnpublishedCourses(reply, {
    authorId,
  });
  if (limit > unpublishedCourseLength)
    return reply.badRequest(
      `querystring/limit must be <= ${unpublishedCourseLength}`
    );

  const maxPage = Math.ceil(unpublishedCourseLength / limit);
  if (page > maxPage)
    return reply.badRequest(`querystring/page must be <= ${maxPage}`);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const unpublishedCourses = await getUnpublishedCourses(reply, {
    authorId,
    skip: startIndex,
    take: limit,
  });

  const prevCount = endIndex - limit;
  const nextCount = Math.max(0, unpublishedCourseLength - endIndex);

  return {
    count: {
      total: unpublishedCourseLength,
      prev: prevCount,
      next: nextCount,
    },
    page: {
      total: maxPage,
      prev: prevCount / limit,
      next: Math.ceil(nextCount / limit),
    },
    courses: unpublishedCourses.map(
      ({ createdAt, updatedAt, ...unpublishedCourse }) => ({
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        ...unpublishedCourse,
      })
    ),
  };
};
