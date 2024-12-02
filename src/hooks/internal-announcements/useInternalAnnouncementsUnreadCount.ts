import { useGetInternalAnnouncementUnreadCoundQuery } from 'services';
export function useInternalAnnouncementsUnreadCount() {
  const { isLoading, data: response, refetch } = useGetInternalAnnouncementUnreadCoundQuery();

  return {
    data: response?.data,
    isLoading,
    refetch
  };
}
