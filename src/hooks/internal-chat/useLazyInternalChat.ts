import { useCallback } from 'react';
import { useLazyGetInternalChatQuery } from 'services';
import { FindAllConversationDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const limit = DEFAULT_PAGE_SIZE;
export function useLazyInternalChat() {
  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs }] = useLazyGetInternalChatQuery();

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

  const fetchData = useCallback((value?: Partial<FindAllConversationDto>) => {
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
