import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { logout as logoutFn } from '@app/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const { dispatch } = useClient();
  const navigate = useNavigate();

  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
      navigate('/');
    },
  });

  function logout() {
    mutate();
  }

  return { logout, error: error as string, isError, isLoading };
}
