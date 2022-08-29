import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { login as loginFn } from '@app/services/auth';
import { LoginForm } from '@app/types';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export function useLogin() {
  const { dispatch } = useClient();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as Location | null)?.pathname;

  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: (form: LoginForm) => loginFn(form),
    onSuccess: () => {
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN });
      navigate(from || '/dashboard', { replace: true });
    },
  });

  function login(form: LoginForm) {
    mutate(form);
  }

  return { login, error: error as string, isError, isLoading };
}
