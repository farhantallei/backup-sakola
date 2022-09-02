import { setAccessToken } from '@app/client';
import { refreshToken as refreshTokenFn } from '@app/services/auth';
import { useMutation } from '@tanstack/react-query';

function useRefreshToken() {
  const minute = 1000 * 60;
  const tokenExpireTime = 15 * minute;

  const { mutate } = useMutation({
    mutationFn: refreshTokenFn,
    onError: () => {
      setAccessToken('');
    },
    onSuccess: ({ token }) => {
      setAccessToken(token);
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

export default useRefreshToken;
