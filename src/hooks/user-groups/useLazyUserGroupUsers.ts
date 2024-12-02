import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetUserGroupUsers, useLazyGetUserGroupUsersQuery } from 'services';
import { AppDispatch } from 'store';
import { FindOneUserGroupUsersDto } from 'types';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useLazyUserGroupUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs, endpointName }] =
    useLazyGetUserGroupUsersQuery();

  const { rows, count } = dataResponse?.data || {};
  const hasMore = Boolean(rows && count && rows.length < count);

  const handleLoadMore = useCallback(() => {
    if (hasMore && originalArgs?.userGroupId)
      trigger({
        ...originalArgs,
        pageSize,
        pageIndex: originalArgs?.pageIndex ? originalArgs?.pageIndex + 1 : DEFAULT_PAGE_INDEX
      });
  }, [hasMore, originalArgs]);

  const fetchData = useCallback((value: FindOneUserGroupUsersDto) => {
    trigger({
      pageIndex: 1,
      pageSize,
      ...originalArgs,
      ...value
    });
  }, []);
  const clearData = () => {
    if (endpointName) dispatch(resetUserGroupUsers(endpointName));
  };
  return {
    data: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    fetchData,
    endpointName,
    clearData
  };
}
