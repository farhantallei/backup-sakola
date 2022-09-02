import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../../middleware';
import { GetCoursesHandler } from './course.handlers';
import { GetCoursesSchema } from './course.schemas';

export const courseRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.addHook('preHandler', authentication);
  route.get('/', {
    schema: GetCoursesSchema,
    handler: GetCoursesHandler,
  });
};
