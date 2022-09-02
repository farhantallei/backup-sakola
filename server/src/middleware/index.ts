import { ACCESS_TOKEN_SECRET } from '../env';
import { RouteHandlerTypebox } from '../types';
import { verifyToken } from '../utils';

export const authentication: RouteHandlerTypebox = async (request, reply) => {
  const authHeader = request.headers.authorization;
  if (authHeader == null) return reply.unauthorized('Not authenticated');
  const token = authHeader.split(' ')[1];
  const decodedToken = verifyToken(token, ACCESS_TOKEN_SECRET, reply);
  request.author = {
    id: decodedToken.sub!,
  };
};
