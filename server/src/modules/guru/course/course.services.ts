import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';
import prisma from '../../../prisma';
import { commitToDB } from '../../../utils';

export async function getCourseCount(
  reply: FastifyReply,
  {
    authorId,
    filter,
    page,
    limit,
  }: {
    authorId: string;
    filter: 'uncategorized' | 'unpublished';
    page: number;
    limit: number;
  }
) {
  const _filter: Record<typeof filter, Prisma.CourseWhereInput> = {
    uncategorized: { subjectId: null },
    unpublished: { published: false, NOT: { subjectId: null } },
  };

  const CourseLength = await commitToDB(
    prisma.course.count({
      where: { authorId, ..._filter[filter] },
    }),
    reply
  );

  if (CourseLength <= 0)
    return {
      count: {
        total: 0,
        prev: 0,
        next: 0,
      },
      page: {
        total: 0,
        current: 1,
        prev: 0,
        next: 0,
      },
      limit: 1,
    };

  // FIXME: Remove schema minimal 0 and set this to Math.max 0 ???
  const _limit = Math.min(limit, CourseLength);

  const maxPage = Math.ceil(CourseLength / _limit);

  const _page = Math.min(page, maxPage);

  const endIndex = _page * _limit;

  const prevCount = endIndex - _limit;
  const nextCount = Math.max(0, CourseLength - endIndex);

  return {
    count: {
      total: CourseLength,
      prev: prevCount,
      next: nextCount,
    },
    page: {
      total: maxPage,
      current: _page,
      prev: prevCount / _limit,
      next: Math.ceil(nextCount / _limit),
    },
    limit: _limit,
  };
}

export async function getUncategorizedCourses(
  reply: FastifyReply,
  { authorId, skip, take }: { authorId: string; skip: number; take: number }
) {
  return await commitToDB(
    prisma.course.findMany({
      where: { authorId, subjectId: null },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        level: true,
        published: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take,
    }),
    reply
  );
}

export async function getUnpublishedCourses(
  reply: FastifyReply,
  { authorId, skip, take }: { authorId: string; skip: number; take: number }
) {
  return await commitToDB(
    prisma.course.findMany({
      where: { authorId, published: false, NOT: { subjectId: null } },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        level: true,
        published: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        subject: {
          select: {
            name: true,
            category: true,
          },
        },
      },
      skip,
      take,
    }),
    reply
  );
}

export async function getCourse(
  reply: FastifyReply,
  { courseId, authorId }: { courseId: string; authorId: string }
) {
  return await commitToDB(
    prisma.course.findUnique({
      where: { id_authorId: { id: courseId, authorId } },
      select: {
        title: true,
        description: true,
        thumbnailUrl: true,
        level: true,
        published: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        subject: {
          select: {
            name: true,
            category: true,
          },
        },
      },
    }),
    reply
  );
}

export async function createCourse(
  reply: FastifyReply,
  { title, authorId }: { title: string; authorId: string }
) {
  return await commitToDB(
    prisma.course.create({
      data: { title, authorId },
      select: { id: true },
    }),
    reply
  );
}
