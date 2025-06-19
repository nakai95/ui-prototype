import { useSuspenseQuery } from '@tanstack/react-query';

import { useRepository } from '@/app/providers/RepositoryProvider';

export const useGetCurrentSessionQuery = () => {
  const {
    auth: { getCurrentSession },
  } = useRepository();

  return useSuspenseQuery({
    queryKey: ['currentSession'],
    queryFn: getCurrentSession,
  });
};
