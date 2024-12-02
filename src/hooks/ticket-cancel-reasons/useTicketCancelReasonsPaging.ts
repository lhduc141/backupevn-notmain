import { usePaging } from 'hooks/usePaging';
import { useGetTicketCancelReasonsQuery } from 'services';
import { FindAllTicketCancelReasonDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useTicketCancelReasonsPaging(params: Omit<FindAllTicketCancelReasonDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, isActive, serviceTypeId } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);

  const {
    data: ticketCancelReasonsResponse,
    error,
    isLoading,
    isFetching
  } = useGetTicketCancelReasonsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    isActive,
    serviceTypeId
  });
  const handleChangePage = changePage;

  return {
    ticketCancelReasons: ticketCancelReasonsResponse?.data.rows,
    count: ticketCancelReasonsResponse ? ticketCancelReasonsResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
