import { useGetInternalChatCountUnreadQuery } from 'services';
export function useGetInternalChatUnreadCount() {
  const { isLoading, data: response, refetch } = useGetInternalChatCountUnreadQuery();

  return {
    data: response?.data,
    isLoading,
    refetch
  };
}
