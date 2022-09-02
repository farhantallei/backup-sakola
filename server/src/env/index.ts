import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      DOMAIN: string;
      PORT: number;
      COOKIE_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export const CLIENT_URL = process.env.CLIENT_URL;
export const DOMAIN = process.env.DOMAIN;
export const PORT = process.env.PORT;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
