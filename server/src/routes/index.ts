import { FastifyPluginAsync } from 'fastify';
import { authRoutes } from '../modules/guru/auth/auth.routes';
import { courseRoutes } from '../modules/guru/course/course.routes';

export const guruRoutes: FastifyPluginAsync = async (route) => {
  route.register(authRoutes, { prefix: 'auth' });
  route.register(courseRoutes, { prefix: 'courses' });
};
