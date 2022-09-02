import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../../env';
import { RouteHandlerTypebox } from '../../../types';
import { verifyToken } from '../../../utils';
import { LoginTSchema, RefreshTokenTSchema } from './auth.schemas';
import { getUser, login } from './auth.services';

export const LoginHandler: RouteHandlerTypebox<LoginTSchema> = async (
  request,
  reply
) => {
  const { username, password } = request.body;

  const user = await getUser(reply, { username });
  if (user == null) return reply.badRequest('Invalid credentials');

  const correctPassword = await bcrypt.compare(password, user.passwordHash);
  if (!correctPassword) return reply.badRequest('Invalid credentials');

  const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
    subject: user.id,
    expiresIn: '3d',
  });

  reply.setCookie('jwt_token', refreshToken, {
    signed: true,
    httpOnly: true,
    sameSite: true,
  });

  const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, {
    subject: user.id,
    expiresIn: '15m',
  });

  return await login(reply, { id: user.id }).then(() => ({
    token: accessToken,
  }));
};

export const RefreshTokenHandler: RouteHandlerTypebox<
  RefreshTokenTSchema
> = async (request, reply) => {
  const signedRefreshToken = request.cookies.jwt_token;
  if (!signedRefreshToken) return reply.unauthorized('Not authenticated');

  const { value: refreshToken } = reply.unsignCookie(signedRefreshToken);
  if (refreshToken == null) return reply.forbidden('Token is invalid');

  const decodedRefreshToken = verifyToken(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    reply
  );

  const newRefreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
    subject: decodedRefreshToken.sub,
    expiresIn: '3d',
  });

  reply.setCookie('jwt_token', newRefreshToken, {
    signed: true,
    httpOnly: true,
    sameSite: true,
  });

  const newAccessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, {
    subject: decodedRefreshToken.sub,
    expiresIn: '15m',
  });

  return { token: newAccessToken };
};
