import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type {
  ContextConfigDefault,
  preHandlerAsyncHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteShorthandOptionsWithHandler,
} from 'fastify';
import type {
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify/types/route';

export interface AccessToken {
  sub: string;
  iat: number;
  exp: number;
}

export interface RefreshToken {
  sub: string;
  iat: number;
  exp: number;
}

export type RouteShorthandOptionsWithHandlerTypebox<TSchema> =
  RouteShorthandOptionsWithHandler<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    RouteGenericInterface,
    ContextConfigDefault,
    TSchema,
    TypeBoxTypeProvider
  >;

export type RouteHandlerTypebox<TSchema> = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>;
