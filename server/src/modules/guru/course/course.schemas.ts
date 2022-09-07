import { Type } from '@sinclair/typebox';
import { CourseModel, SubjectModel } from '../../../models';

export const GetUncategorizedCoursesSchema = {
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
        current: Type.Number(),
        prev: Type.Number(),
        next: Type.Number(),
      }),
      limit: Type.Number(),
      courses: Type.Array(
        Type.Object({
          id: CourseModel.response.id,
          title: CourseModel.response.title,
          thumbnailUrl: CourseModel.response.thumbnailUrl,
          level: CourseModel.response.level,
          published: CourseModel.response.published,
          status: CourseModel.response.status,
          createdAt: CourseModel.response.createdAt,
          updatedAt: CourseModel.response.updatedAt,
        })
      ),
    }),
  },
};

export type GetUncategorizedCoursesTSchema =
  typeof GetUncategorizedCoursesSchema;

export const GetUnpublishedCoursesSchema = {
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
        current: Type.Number(),
        prev: Type.Number(),
        next: Type.Number(),
      }),
      limit: Type.Number(),
      courses: Type.Array(
        Type.Object({
          id: CourseModel.response.id,
          title: CourseModel.response.title,
          thumbnailUrl: CourseModel.response.thumbnailUrl,
          level: CourseModel.response.level,
          published: CourseModel.response.published,
          status: CourseModel.response.status,
          createdAt: CourseModel.response.createdAt,
          updatedAt: CourseModel.response.updatedAt,
          subject: Type.Union([
            Type.Object({
              name: SubjectModel.response.name,
              category: SubjectModel.response.category,
            }),
            Type.Null(),
          ]),
        })
      ),
    }),
  },
};

export type GetUnpublishedCoursesTSchema = typeof GetUnpublishedCoursesSchema;

export const GetCourseSchema = {
  params: Type.Object({
    courseId: CourseModel.validation.id,
  }),
  response: {
    200: Type.Object({
      title: CourseModel.response.title,
      description: CourseModel.response.description,
      thumbnailUrl: CourseModel.response.thumbnailUrl,
      level: CourseModel.response.level,
      published: CourseModel.response.published,
      status: CourseModel.response.status,
      createdAt: CourseModel.response.createdAt,
      updatedAt: CourseModel.response.updatedAt,
      publishedAt: CourseModel.response.publishedAt,
      subject: Type.Union([
        Type.Object({
          name: SubjectModel.response.name,
          category: SubjectModel.response.category,
        }),
        Type.Null(),
      ]),
    }),
  },
};

export type GetCourseTSchema = typeof GetCourseSchema;
