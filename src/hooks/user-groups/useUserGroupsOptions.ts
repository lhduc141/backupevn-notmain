import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetUserGroupsOptionsQuery } from 'services';
import { FindAllUserGroupDto, UseQueryOptionsType } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useUserGroupsOptions(
  params: Omit<FindAllUserGroupDto, 'pageIndex' | 'pageSize'>,
  options?: UseQueryOptionsType
) {
  const { keyword, organizationUnitId, userGroupId } = params;
  const { pageIndex, resetPage, nextPage } = usePaging(params);
  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetUserGroupsOptionsQuery(
    {
      keyword,
      organizationUnitId,
      userGroupId,
      pageIndex: pageIndex,
      pageSize
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
    userGroups: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
