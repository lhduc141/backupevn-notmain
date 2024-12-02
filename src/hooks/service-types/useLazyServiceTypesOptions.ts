import { useCallback } from 'react';
import { useLazyGetServiceTypesOptionsQuery } from 'services';
import { FindAllServiceTypeDto } from 'types';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useLazyServiceTypesOptions() {
  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs }] = useLazyGetServiceTypesOptionsQuery();

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

  const fetchData = useCallback((value?: Partial<FindAllServiceTypeDto>) => {
    trigger({
      pageIndex: 1,
      pageSize,
      ...originalArgs,
      ...value
    });
  }, []);

  return {
    serviceTypesOptions: rows || [],
    count: count || 0,
    isLoading: isLoading || isFetching,
    hasMore,
    fetchData,
    handleLoadMore
  };
}
