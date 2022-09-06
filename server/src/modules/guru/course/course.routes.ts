import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../../middleware';
import {
  GetCourseHandler,
  GetUncategorizedCoursesHandler,
  GetUnpublishedCoursesHandler,
} from './course.handlers';
import {
  GetCourseSchema,
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
  route.get('/:courseId', {
    schema: GetCourseSchema,
    handler: GetCourseHandler,
  });
};
