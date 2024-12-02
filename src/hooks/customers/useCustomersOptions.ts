import { usePaging } from 'hooks/usePaging';
import { useCallback } from 'react';
import { useGetCustomerOptionsQuery } from 'services/customers';
import { FindAllCustomerDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useCustomersOptions(params: Omit<FindAllCustomerDto, 'pageIndex' | 'pageSize'>) {
  const {
    keyword,
    customerCode,
    customerName,
    customerAddress,
    districtId,
    meterPointCode,
    meterSerialNumber,
    organizationUnitCode,
    routeCode,
    wardId
  } = params;
  const { pageIndex, resetPage, nextPage } = usePaging(params);
  const {
    data: dataResponse,
    isLoading,
    isFetching
  } = useGetCustomerOptionsQuery({
    keyword,
    customerCode,
    customerName,
    customerAddress,
    districtId,
    meterPointCode,
    meterSerialNumber,
    organizationUnitCode,
    routeCode,
    wardId,
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
    customersOptions: rows || [],
    count: count || 0,
    isFetching,
    isLoading,
    handleLoadMore,
    hasMore,
    resetPage
  };
}
