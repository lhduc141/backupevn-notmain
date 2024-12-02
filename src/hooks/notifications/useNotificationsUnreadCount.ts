import { useGeNotificationsUnreadCountQuery } from 'services';
export function useNotificationsUnreadCount() {
  const { isLoading, data: response } = useGeNotificationsUnreadCountQuery();

  return {
    data: response?.data,
    isLoading
  };
}
