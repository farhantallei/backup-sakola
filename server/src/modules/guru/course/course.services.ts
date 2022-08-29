import { FastifyReply } from 'fastify';
import prisma from '../../../prisma';
import { commitToDB } from '../../../utils';

export async function countCourses(
  reply: FastifyReply,
  { authorId }: { authorId: string }
) {
  return await commitToDB(prisma.course.count({ where: { authorId } }), reply);
}

export async function getCourses(
  reply: FastifyReply,
  { authorId, skip, take }: { authorId: string; skip: number; take: number }
) {
  return await commitToDB(
    prisma.course.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    reply
  );
}
