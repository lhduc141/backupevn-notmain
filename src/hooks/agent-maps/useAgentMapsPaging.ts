import { usePaging } from 'hooks/usePaging';
import { useGetAgentMapsQuery } from 'services';
import { FindAllAgentMapDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';

const pageSize = DEFAULT_PAGE_SIZE;

export function useAgentMapsPaging(params: Omit<FindAllAgentMapDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, isActive } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: agentMapsResponse,
    error,
    isLoading,
    isFetching
  } = useGetAgentMapsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    isActive
  });
  const handleChangePage = changePage;

  return {
    agentMaps: agentMapsResponse?.data.rows,
    count: agentMapsResponse ? agentMapsResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
