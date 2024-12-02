import { usePaging } from 'hooks/usePaging';
import { useGetVipCustomersQuery } from 'services';
import { FindAllVipCustomerDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useVipCustomersPaging(params: Omit<FindAllVipCustomerDto, 'pageIndex' | 'pageSize'>) {
  const { keyword } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: vipCustomersResponse,
    error,
    isLoading,
    isFetching
  } = useGetVipCustomersQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword
  });
  const handleChangePage = changePage;

  return {
    vipCustomers: vipCustomersResponse?.data.rows,
    count: vipCustomersResponse ? vipCustomersResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
