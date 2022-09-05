import { RouteHandlerTypebox } from '../../../types';
import {
  GetUncategorizedCoursesTSchema,
  GetUnpublishedCoursesTSchema,
} from './course.schemas';
import {
  countUncategorizedCourses,
  countUnpublishedCourses,
  getUncategorizedCourses,
  getUnpublishedCourses,
} from './course.services';

export const GetUncategorizedCoursesHandler: RouteHandlerTypebox<
  GetUncategorizedCoursesTSchema
> = async (request, reply) => {
  const { page, limit } = request.query;
  const authorId = request.author.id;

  const uncategorizedCourseLength = await countUncategorizedCourses(reply, {
    authorId,
  });
  if (uncategorizedCourseLength <= 0)
    return {
      count: {
        total: 0,
        prev: 0,
        next: 0,
      },
      page: {
        total: 0,
        prev: 0,
        next: 0,
      },
      courses: [],
    };
  if (limit > uncategorizedCourseLength)
    return reply.badRequest(
      `querystring/limit must be <= ${uncategorizedCourseLength}`
    );

  const maxPage = Math.ceil(uncategorizedCourseLength / limit);
  if (page > maxPage)
    return reply.badRequest(`querystring/page must be <= ${maxPage}`);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const uncategorizedCourses = await getUncategorizedCourses(reply, {
    authorId,
    skip: startIndex,
    take: limit,
  });

  const prevCount = endIndex - limit;
  const nextCount = Math.max(0, uncategorizedCourseLength - endIndex);

  return {
    count: {
      total: uncategorizedCourseLength,
      prev: prevCount,
      next: nextCount,
    },
    page: {
      total: maxPage,
      prev: prevCount / limit,
      next: Math.ceil(nextCount / limit),
    },
    courses: uncategorizedCourses.map(
      ({ createdAt, updatedAt, ...uncategorizedCourse }) => ({
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        ...uncategorizedCourse,
      })
    ),
  };
};

export const GetUnpublishedCoursesHandler: RouteHandlerTypebox<
  GetUnpublishedCoursesTSchema
> = async (request, reply) => {
  const { page, limit } = request.query;
  const authorId = request.author.id;

  const unpublishedCourseLength = await countUnpublishedCourses(reply, {
    authorId,
  });
  if (unpublishedCourseLength <= 0)
    return {
      count: {
        total: 0,
        prev: 0,
        next: 0,
      },
      page: {
        total: 0,
        prev: 0,
        next: 0,
      },
      courses: [],
    };
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
