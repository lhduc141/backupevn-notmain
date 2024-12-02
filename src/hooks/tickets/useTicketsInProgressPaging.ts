import { usePaging } from "hooks/usePaging";
import { useGetTicketsInProgressQuery } from "services/tickets";
import { FindAllTicketDto } from "types/dto/ticket";
import { DEFAULT_PAGE_SIZE } from "utils";

const pageSize = DEFAULT_PAGE_SIZE;
export function useTicketsInProgressPaging(params: Omit<FindAllTicketDto, 'pageSize'>) {
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
        data: ticketsInProgressResponse,
        error,
        isFetching,
        isLoading
    } = useGetTicketsInProgressQuery(
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
        ticketsInProgress: ticketsInProgressResponse?.data.rows,
        count: ticketsInProgressResponse ? ticketsInProgressResponse.data.count : 0,
        isLoading : isFetching || isLoading,
        pageIndex,
        handleChangePage,
        resetPage,
        error
    };
}