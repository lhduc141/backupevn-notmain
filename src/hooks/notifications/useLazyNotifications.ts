import { useCallback } from 'react';
import { useLazyGeNotificationsQuery } from 'services';
import { FindAllNotificationDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const limit = DEFAULT_PAGE_SIZE;
export function useLazyNotifications() {
  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs }] = useLazyGeNotificationsQuery();

  const { rows, count } = dataResponse?.data || {};
  const hasMore = Boolean(rows && count && rows.length < count);

  const handleLoadMore = useCallback(() => {
    if (hasMore)
      trigger({
        ...originalArgs,
        limit,
        skip: rows?.length || 0
      });
  }, [hasMore, originalArgs, rows]);

  const fetchData = useCallback((value?: Partial<FindAllNotificationDto>) => {
    trigger({
      skip: 0,
      limit,
      ...originalArgs,
      ...value
    });
  }, []);

  return {
    data: rows || [],
    count: count || 0,
    isLoading: isLoading,
    hasMore,
    fetchData,
    handleLoadMore,
    isFetching: isFetching,
    originalArgs
  };
}
