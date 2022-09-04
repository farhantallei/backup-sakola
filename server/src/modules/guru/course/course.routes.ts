import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../../middleware';
import { GetUnpublishedCoursesHandler } from './course.handlers';
import { GetUnpublishedCoursesSchema } from './course.schemas';

export const courseRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.addHook('preHandler', authentication);
  route.get('/', {
    schema: GetUnpublishedCoursesSchema,
    handler: GetUnpublishedCoursesHandler,
  });
};
