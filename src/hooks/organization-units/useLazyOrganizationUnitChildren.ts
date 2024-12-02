import { useCallback } from 'react';
import { useLazyGetOrganizationUnitChildrenQuery } from 'services';
import { FindOneOrganizationUnitChildrenDto } from 'types';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useLazyOrganizationUnitChildren() {
  const [trigger, { data: dataResponse, isLoading, isFetching, originalArgs }] =
    useLazyGetOrganizationUnitChildrenQuery();

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

  const fetchData = useCallback((value: FindOneOrganizationUnitChildrenDto) => {
    trigger({
      pageIndex: 1,
      pageSize,
      ...originalArgs,
      ...value
    });
  }, []);

  return {
    organizationsUnits: rows || [],
    count: count || 0,
    isLoading: isLoading || isFetching,
    hasMore,
    fetchData,
    handleLoadMore
  };
}
