import { usePaging } from 'hooks/usePaging';
import { useGetTicketSamplesQuery } from 'services';
import { FindAllTicketSampleDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useTicketSamplesPaging(params: Omit<FindAllTicketSampleDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, serviceTypeId, isActive } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: ticketSampleResponse,
    error,
    isLoading,
    isFetching
  } = useGetTicketSamplesQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    serviceTypeId,
    isActive
  });
  const handleChangePage = changePage;

  return {
    ticketSamples: ticketSampleResponse?.data.rows,
    count: ticketSampleResponse ? ticketSampleResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
