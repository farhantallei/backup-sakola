import { FastifyReply } from 'fastify';
import prisma from '../../../prisma';
import { commitToDB } from '../../../utils';

export async function countCourses(
  reply: FastifyReply,
  { authorId }: { authorId: string }
) {
  return await commitToDB(prisma.course.count({ where: { authorId } }), reply);
}

// TODO: Select only necessary data. Then update the response type on the client side.
export async function getCourses(
  reply: FastifyReply,
  { authorId, skip, take }: { authorId: string; skip: number; take: number }
) {
  return await commitToDB(
    prisma.course.findMany({
      where: { authorId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnailUrl: true,
        level: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
      },
      skip,
      take,
    }),
    reply
  );
}
