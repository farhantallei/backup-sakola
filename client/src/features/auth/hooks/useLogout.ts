import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { logout } from '@app/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const { dispatch } = useClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
      queryClient.clear();
      navigate('/');
    },
  });
}

export default useLogout;
