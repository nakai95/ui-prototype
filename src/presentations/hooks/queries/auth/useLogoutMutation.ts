import { useMutation } from '@tanstack/react-query';

import { useRepository } from '@/app/providers/RepositoryProvider';

export const useLogoutMutation = () => {
  const {
    auth: { logoutUser },
  } = useRepository();

  return useMutation({
    mutationFn: logoutUser,
  });
};
