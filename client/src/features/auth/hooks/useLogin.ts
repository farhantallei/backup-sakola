import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { login } from '@app/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

function useLogin() {
  const { setHeader, dispatch } = useClient();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as Location | null)?.pathname;

  return useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      setHeader(token);
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN });
      navigate(from || '/dashboard', { replace: true });
    },
  });
}

export default useLogin;
