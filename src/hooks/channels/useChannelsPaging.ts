import { usePaging } from "hooks/usePaging";
import { useGetChannelsQuery } from "services/channels";
import { FindAllChannelDto } from "types/dto/channel";
import { DEFAULT_PAGE_SIZE } from "utils";

const pageSize = DEFAULT_PAGE_SIZE;
export function useChannelsPaging(params: Omit<FindAllChannelDto, 'pageIndex' | 'pageSize'>) {
    const {pageIndex, changePage} = usePaging(params);
    const {
        data: channelsResponse,
        error,
        isLoading,
        isFetching
    } = useGetChannelsQuery({
        pageIndex: pageIndex,
        pageSize
    });
    const handleChangePage = changePage;
    return {
        channels: channelsResponse?.data.rows,
        count: channelsResponse ? channelsResponse.data.count: 0,
        pageIndex,
        isLoading: isFetching || isLoading,
        error,
        handleChangePage
    }
}