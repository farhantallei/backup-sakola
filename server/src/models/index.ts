import { Type } from '@sinclair/typebox';

export const AuthorModel = {
  validation: {
    id: Type.RegEx(/^c[^\s-]{8,}$/),
    name: Type.String({ minLength: 3 }),
    email: Type.String({ format: 'email' }),
    username: Type.String({ minLength: 3 }),
    passwordHash: Type.String(),
    avatarUrl: Type.Optional(Type.String({ format: 'uri' })),
    city: Type.String({ minLength: 3 }),
    instagram: Type.Optional(Type.String({ minLength: 3 })),
    twitter: Type.Optional(Type.String({ minLength: 3 })),
    facebook: Type.Optional(Type.String({ minLength: 3 })),
    youtube: Type.Optional(Type.String({ minLength: 3 })),
    linkedin: Type.Optional(Type.String({ minLength: 3 })),
    websiteUrl: Type.Optional(Type.String({ format: 'uri' })),
    createdAt: Type.String({ format: 'date-time' }),
    lastLogin: Type.String({ format: 'date-time' }),
  },
  response: {
    id: Type.String(),
    name: Type.String(),
    email: Type.String(),
    username: Type.String(),
    passwordHash: Type.String(),
    avatarUrl: Type.Union([Type.String(), Type.Null()]),
    city: Type.String(),
    instagram: Type.Union([Type.String(), Type.Null()]),
    twitter: Type.Union([Type.String(), Type.Null()]),
    facebook: Type.Union([Type.String(), Type.Null()]),
    youtube: Type.Union([Type.String(), Type.Null()]),
    linkedin: Type.Union([Type.String(), Type.Null()]),
    websiteUrl: Type.Union([Type.String(), Type.Null()]),
    createdAt: Type.String(),
    lastLogin: Type.String(),
  },
};

export const SubjectModel = {
  validation: {
    id: Type.RegEx(/^c[^\s-]{8,}$/),
    name: Type.String({ minLength: 3 }),
    category: Type.Union([Type.Literal('islam'), Type.Literal('dunia')]),
  },
  response: {
    id: Type.String(),
    name: Type.String(),
    category: Type.String(),
  },
};

export const CourseModel = {
  validation: {
    id: Type.RegEx(/^c[^\s-]{8,}$/),
    title: Type.String({ minLength: 3 }),
    description: Type.Optional(Type.String()),
    thumbnailUrl: Type.Optional(Type.String({ format: 'uri' })),
    level: Type.Optional(
      Type.Union([
        Type.Literal('pemula'),
        Type.Literal('menengah'),
        Type.Literal('lanjutan'),
      ])
    ),
    published: Type.Boolean(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),
    publishedAt: Type.Optional(Type.String({ format: 'date-time' })),
  },
  response: {
    id: Type.String(),
    title: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    thumbnailUrl: Type.Union([Type.String(), Type.Null()]),
    level: Type.Union([Type.String(), Type.Null()]),
    published: Type.Boolean(),
    createdAt: Type.String(),
    updatedAt: Type.String(),
    publishedAt: Type.Union([Type.String(), Type.Null()]),
  },
};
