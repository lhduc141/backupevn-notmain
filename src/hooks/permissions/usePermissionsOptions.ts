import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetPermissionsOptionsQuery } from 'services';
import { FindAllPermissionDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function usePermissionsOptions(params: Omit<FindAllPermissionDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, organizationUnitIds } = params;
  const { pageIndex, resetPage, nextPage } = usePaging(params);
  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetPermissionsOptionsQuery({
    keyword,
    organizationUnitIds: organizationUnitIds,
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
    permissionsOptions: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
