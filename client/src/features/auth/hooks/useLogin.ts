import { setAccessToken } from '@app/client';
import { login } from '@app/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as Location | null)?.pathname;

  return useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      setAccessToken(token);
      navigate(from || '/dashboard', { replace: true });
    },
  });
}

export default useLogin;
