import { Type } from '@sinclair/typebox';
import { CourseModel } from '../../../models';

export const GetCoursesSchema = {
  querystring: Type.Object({
    page: Type.Number({ minimum: 1, multipleOf: 1 }),
    limit: Type.Number({ minimum: 1, multipleOf: 1 }),
  }),
  response: {
    200: Type.Object({
      count: Type.Object({
        total: Type.Number(),
        prev: Type.Number(),
        next: Type.Number(),
      }),
      page: Type.Object({
        total: Type.Number(),
        prev: Type.Number(),
        next: Type.Number(),
      }),
      courses: Type.Array(Type.Object(CourseModel.response)),
    }),
  },
};

export type GetCoursesTSchema = typeof GetCoursesSchema;
