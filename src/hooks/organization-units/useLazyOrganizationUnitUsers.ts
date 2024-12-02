import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { resetOrganizationUnitUsers, useLazyGetOrganizationUnitUsersQuery } from 'services';
import { AppDispatch } from 'store';
import { FindOneOrganizationUnitUsersDto } from 'types';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useLazyOrganizationUnitUsers() {
  const dispatch = useDispatch<AppDispatch>();

  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs, endpointName }] =
    useLazyGetOrganizationUnitUsersQuery();

  const { rows, count } = dataResponse?.data || {};
  const hasMore = Boolean(rows && count && rows.length < count);

  const handleLoadMore = useCallback(() => {
    if (hasMore && originalArgs?.organizationUnitId)
      trigger({
        ...originalArgs,
        pageSize,
        pageIndex: originalArgs?.pageIndex ? originalArgs?.pageIndex + 1 : DEFAULT_PAGE_INDEX
      });
  }, [hasMore, originalArgs]);

  const fetchData = useCallback((value: FindOneOrganizationUnitUsersDto) => {
    trigger({
      pageIndex: 1,
      pageSize,
      ...originalArgs,
      ...value
    });
  }, []);
  const clearData = () => {
    if (endpointName) dispatch(resetOrganizationUnitUsers(endpointName));
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
