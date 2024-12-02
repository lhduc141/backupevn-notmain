import { useCallback } from 'react';
import { useLazyGetInternalAnnouncementsActiveQuery } from 'services';
import { FindAllInternalAnnouncementActiveDto, InternalAnnouncementDto, ResponsePagingDto } from 'types';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useLazyInternalAnnouncementsActive() {
  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs }] =
    useLazyGetInternalAnnouncementsActiveQuery();

  const { rows, count } = dataResponse?.data || {};
  const hasMore = Boolean(rows && count && rows.length < count);

  const handleLoadMore = useCallback(() => {
    if (hasMore)
      trigger({
        ...originalArgs,
        pageSize,
        pageIndex: originalArgs?.pageIndex ? originalArgs?.pageIndex + 1 : DEFAULT_PAGE_INDEX
      });
  }, [hasMore, originalArgs]);

  const fetchData = useCallback(
    (
      value?: Partial<FindAllInternalAnnouncementActiveDto>,
      callback?: (data?: ResponsePagingDto<InternalAnnouncementDto> | undefined) => void
    ) => {
      trigger({
        pageIndex: 1,
        pageSize,
        ...originalArgs,
        ...value
      }).then((rs) => callback?.(rs.data));
    },
    []
  );

  return {
    data: rows || [],
    count: count || 0,
    isLoading: isLoading || isFetching,
    hasMore,
    fetchData,
    handleLoadMore
  };
}
