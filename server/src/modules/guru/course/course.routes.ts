import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authentication } from '../../../middleware';
import {
  CreateCourseHandler,
  GetCourseHandler,
  GetUncategorizedCoursesHandler,
  GetUnpublishedCoursesHandler,
} from './course.handlers';
import {
  CreateCourseSchema,
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
  route.post('/', {
    schema: CreateCourseSchema,
    handler: CreateCourseHandler,
  });
};
