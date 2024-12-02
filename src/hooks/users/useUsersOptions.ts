import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetUsersOptionsQuery } from 'services';
import { FindAllUserDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useUsersOptions(params: Omit<FindAllUserDto, 'pageIndex' | 'pageSize'>) {
  const { organizationUnitId, statusId, userGroupId, keyword } = params;
  const { pageIndex, resetPage, nextPage } = usePaging(params);
  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetUsersOptionsQuery({
    keyword,
    organizationUnitId,
    statusId,
    userGroupId,
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
    usersOptions: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
