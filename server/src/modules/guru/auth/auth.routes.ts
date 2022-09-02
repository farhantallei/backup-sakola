import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../../middleware';
import { LoginHandler, RefreshTokenHandler } from './auth.handlers';
import { LoginSchema, RefreshTokenSchema } from './auth.schemas';

export const authRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.post('/login', {
    schema: LoginSchema,
    handler: LoginHandler,
  });
  route.post('/logout', {
    preHandler: authentication,
    handler: (request, reply) => {
      reply.setCookie('jwt_token', '');
      return reply.code(204).send();
    },
  });
  route.post('/refreshToken', {
    schema: RefreshTokenSchema,
    handler: RefreshTokenHandler,
  });
};
