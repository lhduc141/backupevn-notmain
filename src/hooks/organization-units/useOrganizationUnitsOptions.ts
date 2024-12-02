import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetOrganizationUnitsOptionsQuery } from 'services';
import { FindAllOrganizationUnitDto, UseQueryOptionsType } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useOrganizationUnitsOptions(
  params: Omit<FindAllOrganizationUnitDto, 'pageIndex' | 'pageSize'>,
  options?: UseQueryOptionsType
) {
  const { keyword, parentId, organizationUnitId } = params;

  const { pageIndex, nextPage, resetPage } = usePaging(params);

  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetOrganizationUnitsOptionsQuery(
    {
      pageIndex: pageIndex,
      pageSize,
      keyword,
      parentId,
      organizationUnitId
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
  }, [hasMore, pageIndex, isFetching]);

  return {
    organizationsUnits: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
