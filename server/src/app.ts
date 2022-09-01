import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySensible from '@fastify/sensible';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { CLIENT_URL, COOKIE_SECRET, JWT_SECRET } from './env';
import { guruRoutes } from './routes';

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

export function addPlugins() {
  app.register(fastifyCookie, { secret: COOKIE_SECRET });
  app.register(fastifyJwt, { secret: JWT_SECRET, jwtDecode: true });
  app.register(fastifyCors, {
    credentials: true,
    origin: CLIENT_URL,
  });
  app.register(fastifySensible);
}

export function addRoutes() {
  app.register(
    async (route) => {
      route.register(guruRoutes, { prefix: 'guru' });
    },
    { prefix: 'api' }
  );
}

export default app;
