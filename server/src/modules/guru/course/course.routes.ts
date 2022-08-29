import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GetCoursesHandler } from './course.handlers';
import { GetCoursesSchema } from './course.schemas';

export const courseRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.addHook('preHandler', (request) => request.jwtVerify());
  route.get('/', {
    schema: GetCoursesSchema,
    handler: GetCoursesHandler,
  });
};
