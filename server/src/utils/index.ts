import { FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import app from '../app';

export async function commitToDB<T>(prisma: Promise<T>, reply?: FastifyReply) {
  const [error, data] = await app.to(prisma);
  if (error) {
    if (reply) return reply.internalServerError(error.message) as never;
    return app.httpErrors.internalServerError(error.message) as never;
  }
  return data;
}

export function verifyToken(
  token: string,
  secret: string,
  reply: FastifyReply
) {
  let decodedToken: jwt.JwtPayload | undefined = undefined;

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return reply.forbidden(error.message);
    }
    if (typeof decoded === 'string' || decoded == null) {
      return reply.forbidden('Token is invalid');
    }
    decodedToken = decoded;
  });

  return decodedToken as unknown as jwt.JwtPayload;
}
