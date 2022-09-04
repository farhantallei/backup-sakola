import { FastifyReply } from 'fastify';
import prisma from '../../../prisma';
import { commitToDB } from '../../../utils';

export async function countUnpublishedCourses(
  reply: FastifyReply,
  { authorId }: { authorId: string }
) {
  return await commitToDB(
    prisma.course.count({ where: { authorId, published: false } }),
    reply
  );
}

export async function getUnpublishedCourses(
  reply: FastifyReply,
  { authorId, skip, take }: { authorId: string; skip: number; take: number }
) {
  return await commitToDB(
    prisma.course.findMany({
      where: { authorId, published: false },
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
