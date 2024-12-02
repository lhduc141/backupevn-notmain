import { usePaging } from 'hooks/usePaging';
import { useGetCustomerSupportInformationQuery } from 'services';
import { FindAllCustomerSupportInformationDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useCustomerSupportInformationPaging(
  params: Omit<FindAllCustomerSupportInformationDto, 'pageIndex' | 'pageSize'>
) {
  const { formatId, isActive, isNew, keyword } = params;
  const { pageIndex, resetPage, changePage } = usePaging(params);
  const {
    data: customerSupportInformationResponse,
    error,
    isLoading,
    isFetching
  } = useGetCustomerSupportInformationQuery({
    pageIndex: pageIndex,
    pageSize,
    formatId,
    isActive,
    isNew,
    keyword
  });
  const handleChangePage = changePage;
  return {
    customerSupportInformation: customerSupportInformationResponse?.data.rows,
    count: customerSupportInformationResponse ? customerSupportInformationResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
