import { useGetUserQuery } from 'services';
export function useUser(userId: number) {
  const { data: userRes, isLoading } = useGetUserQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true
  });

  return {
    user: userRes?.data,
    isLoading
  };
}
