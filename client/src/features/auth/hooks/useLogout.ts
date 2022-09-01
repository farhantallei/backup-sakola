import { useClient } from '@app/client';
import { AUTH_ACTION_TYPES } from '@app/constants';
import { logout as logoutFn } from '@app/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// TODO:  add Login result type conditionally.
// REF:   useCourseList.ts
function useLogout() {
  const { dispatch } = useClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
      queryClient.clear();
      navigate('/');
    },
  });

  function logout() {
    mutate();
  }

  return { logout, error: error as string, isError, isLoading };
}

export default useLogout;