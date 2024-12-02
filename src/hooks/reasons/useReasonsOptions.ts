import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetReasonsOptionsQuery } from 'services';
import { FindAllReasonDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useReasonsOptions(params: Omit<FindAllReasonDto, 'pageIndex' | 'pageSize'>) {
  const { keyword } = params;
  const { pageIndex, resetPage, nextPage } = usePaging(params);
  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetReasonsOptionsQuery({
    keyword,
    pageIndex: pageIndex,
    pageSize
  });

  const { rows, count } = dataResponse?.data || {};

  const hasMore = Boolean(rows && count && rows.length < count);
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      nextPage();
    }
  }, [hasMore, pageIndex]);

  return {
    reasonsOptions: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
