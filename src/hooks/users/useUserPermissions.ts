import { useGetUserPermissionsQuery } from 'services';
export function useUserPermissions(userId: number) {
  const { data: userPermissionsRes, isLoading } = useGetUserPermissionsQuery(userId!, {
    skip: !userId
  });

  return {
    userPermissions: userPermissionsRes?.data,
    isLoading
  };
}
