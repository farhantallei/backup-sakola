import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      DOMAIN: string;
      PORT: number;
      COOKIE_SECRET: string;
      JWT_SECRET: string;
    }
  }
}

export const CLIENT_URL = process.env.CLIENT_URL;
export const DOMAIN = process.env.DOMAIN;
export const PORT = process.env.PORT;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
