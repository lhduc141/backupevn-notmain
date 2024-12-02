import { usePaging } from "hooks/usePaging";
import { useGetTicketsCompletedQuery } from "services/tickets";
import { FindAllTicketDto } from "types/dto/ticket";
import { DEFAULT_PAGE_SIZE } from "utils";

const pageSize = DEFAULT_PAGE_SIZE;
export function useTicketsCompletedPaging(params: Omit<FindAllTicketDto, 'pageSize'>) {
    const {
        keyword,
        customerCode,
        organizationUnitId,
        statusId,
        channelId,
        serviceTypeId,
    } = params;
    const {pageIndex, changePage, resetPage} = usePaging(params);
    const {
        data: ticketsCompletedResponse,
        error,
        isFetching,
        isLoading
    } = useGetTicketsCompletedQuery(
        {
            pageIndex,
            pageSize,
            keyword,
            customerCode,
            organizationUnitId,
            statusId,
            channelId,
            serviceTypeId
        },
        {
            refetchOnMountOrArgChange: true
        }
    );
    const handleChangePage = changePage;

    return {
        ticketsCompleted: ticketsCompletedResponse?.data.rows,
        count: ticketsCompletedResponse ? ticketsCompletedResponse.data.count : 0,
        isLoading : isFetching || isLoading,
        pageIndex,
        handleChangePage,
        resetPage,
        error
    };
}