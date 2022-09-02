import { createGlobalState } from 'react-hooks-global-state';

const { getGlobalState, setGlobalState } = createGlobalState<{
  accessToken: string | null;
}>({
  accessToken: null,
});

export function getAccessToken() {
  return getGlobalState('accessToken');
}

export function setAccessToken(token: string) {
  setGlobalState('accessToken', token);
}
