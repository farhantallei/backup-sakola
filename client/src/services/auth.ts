import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
} from '@app/types/rest';
import { makeRequest } from './makeRequest';

const prefix = 'auth';

export function login(data: LoginRequest) {
  return makeRequest<LoginResponse, LoginRequest>(`${prefix}/login`, {
    method: 'POST',
    data,
  });
}

export function logout() {
  return makeRequest<never>(`${prefix}/logout`, {
    method: 'POST',
  });
}

export function refreshToken() {
  return makeRequest<RefreshTokenResponse>(`${prefix}/refreshToken`, {
    method: 'POST',
  });
}
