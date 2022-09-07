import { RouteHandlerTypebox } from '../../../types';
import {
  GetCourseTSchema,
  GetUncategorizedCoursesTSchema,
  GetUnpublishedCoursesTSchema,
} from './course.schemas';
import {
  getCourse,
  getCourseCount,
  getUncategorizedCourses,
  getUnpublishedCourses,
} from './course.services';

export const GetUncategorizedCoursesHandler: RouteHandlerTypebox<
  GetUncategorizedCoursesTSchema
> = async (request, reply) => {
  const { page, limit } = request.query;
  const authorId = request.author.id;

  const startIndex = (page - 1) * limit;

  const count = await getCourseCount(reply, {
    authorId,
    page,
    limit,
    filter: 'uncategorized',
  });

  const courses = await getUncategorizedCourses(reply, {
    authorId,
    skip: startIndex,
    take: limit,
  }).then((courses) =>
    courses.map(({ createdAt, updatedAt, ...uncategorizedCourse }) => ({
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...uncategorizedCourse,
    }))
  );

  return {
    ...count,
    courses,
  };
};

export const GetUnpublishedCoursesHandler: RouteHandlerTypebox<
  GetUnpublishedCoursesTSchema
> = async (request, reply) => {
  const { page, limit } = request.query;
  const authorId = request.author.id;

  const startIndex = (page - 1) * limit;

  const count = await getCourseCount(reply, {
    authorId,
    page,
    limit,
    filter: 'unpublished',
  });

  const courses = await getUnpublishedCourses(reply, {
    authorId,
    skip: startIndex,
    take: limit,
  }).then((courses) =>
    courses.map(({ createdAt, updatedAt, ...unpublishedCourse }) => ({
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      ...unpublishedCourse,
    }))
  );

  return {
    ...count,
    courses,
  };
};

export const GetCourseHandler: RouteHandlerTypebox<GetCourseTSchema> = async (
  request,
  reply
) => {
  const { courseId } = request.params;
  const authorId = request.author.id;

  const courseQuery = await getCourse(reply, { courseId, authorId });
  if (courseQuery == null) return reply.notFound('Course is not found');

  const { createdAt, updatedAt, publishedAt, ...course } = courseQuery;

  return {
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    publishedAt: publishedAt?.toISOString() || null,
    ...course,
  };
};
