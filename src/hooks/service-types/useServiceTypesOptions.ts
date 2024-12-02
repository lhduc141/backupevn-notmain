import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetServiceTypesOptionsQuery } from 'services';
import { FindAllServiceTypeDto, UseQueryOptionsType } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useServiceTypesOptions(
  params: Omit<FindAllServiceTypeDto, 'pageIndex' | 'pageSize'>,
  options?: UseQueryOptionsType
) {
  const { isActive, keyword, serviceTypeId, parentId, ...restParams } = params;
  const { pageIndex, resetPage, nextPage } = usePaging(params);
  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetServiceTypesOptionsQuery(
    {
      pageIndex: pageIndex,
      pageSize,
      keyword,
      isActive,
      serviceTypeId,
      parentId,
      ...restParams
    },
    {
      ...options
    }
  );
  const { rows, count } = dataResponse?.data || {};

  const hasMore = Boolean(rows && count && rows.length < count);
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      nextPage();
    }
  }, [hasMore, pageIndex]);

  return {
    serviceTypesOptions: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
