import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { login as loginFn } from '@app/services/auth';
import { LoginRequest } from '@app/types/rest';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

// TODO:  add Login result type conditionally.
// REF:   useCourseList.ts
function useLogin() {
  const { dispatch } = useClient();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as Location | null)?.pathname;

  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: (form: LoginRequest) => loginFn(form),
    onSuccess: () => {
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN });
      navigate(from || '/dashboard', { replace: true });
    },
  });

  function login(form: LoginRequest) {
    mutate(form);
  }

  return { login, error: error as string, isError, isLoading };
}

export default useLogin;
