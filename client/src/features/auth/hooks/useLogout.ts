import { setAccessToken } from '@app/client';
import { logout } from '@app/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken('');
      queryClient.clear();
      navigate('/');
    },
  });
}

export default useLogout;
