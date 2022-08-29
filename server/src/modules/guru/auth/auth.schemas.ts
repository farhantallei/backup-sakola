import { Type } from '@sinclair/typebox';
import { AuthorModel } from '../../../models';

export const LoginSchema = {
  body: Type.Object({
    username: AuthorModel.username,
    password: Type.String({ minLength: 8 }),
  }),
  response: {
    200: Type.Object({
      token: Type.String(),
    }),
  },
};

export type LoginTSchema = typeof LoginSchema;

export const RefreshTokenSchema = {
  response: {
    200: Type.Object({
      token: Type.String(),
    }),
  },
};

export type RefreshTokenTSchema = typeof RefreshTokenSchema;
