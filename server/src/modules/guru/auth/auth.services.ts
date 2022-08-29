import { FastifyReply } from 'fastify';
import prisma from '../../../prisma';
import { commitToDB } from '../../../utils';

export async function getUser(reply: FastifyReply, data: { username: string }) {
  return await commitToDB(
    prisma.author.findUnique({
      where: { username: data.username },
      select: { id: true, username: true, passwordHash: true },
    }),
    reply
  );
}

export async function login(reply: FastifyReply, data: { id: string }) {
  return await commitToDB(
    prisma.author.update({
      where: { id: data.id },
      data: { lastLogin: new Date() },
      select: null,
    }),
    reply
  );
}
