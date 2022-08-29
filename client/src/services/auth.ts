import { LoginForm } from '@app/types';
import { makeRequest } from './makeRequest';

const prefix = 'auth';

export function login({ username, password }: LoginForm) {
  return makeRequest<{ token: string }, LoginForm>(`${prefix}/login`, {
    method: 'POST',
    data: { username, password },
  });
}

export function logout() {
  return makeRequest<never>(`${prefix}/logout`, {
    method: 'POST',
  });
}

export function refreshToken() {
  return makeRequest<{ token: string }>(`${prefix}/refreshToken`, {
    method: 'POST',
  });
}
