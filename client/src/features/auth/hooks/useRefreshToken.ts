import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { refreshToken as refreshTokenFn } from '@app/services/auth';
import { useMutation } from '@tanstack/react-query';

export function useRefreshToken() {
  const { setHeader, dispatch } = useClient();

  const minute = 1000 * 60;
  const tokenExpireTime = 15 * minute;

  const { mutate } = useMutation({
    mutationFn: refreshTokenFn,
    onError: () => {
      dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
    },
    onSuccess: ({ token }) => {
      setHeader(token);
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN });
    },
  });

  function refreshToken() {
    mutate();
  }

  return {
    refreshToken,
    refetchToken: tokenExpireTime - minute,
  };
}
