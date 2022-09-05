import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../../middleware';
import {
  GetUncategorizedCoursesHandler,
  GetUnpublishedCoursesHandler,
} from './course.handlers';
import {
  GetUncategorizedCoursesSchema,
  GetUnpublishedCoursesSchema,
} from './course.schemas';

export const courseRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.addHook('preHandler', authentication);
  route.get('/uncategorized', {
    schema: GetUncategorizedCoursesSchema,
    handler: GetUncategorizedCoursesHandler,
  });
  route.get('/unpublished', {
    schema: GetUnpublishedCoursesSchema,
    handler: GetUnpublishedCoursesHandler,
  });
};
