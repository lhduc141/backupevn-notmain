import { usePaging } from 'hooks/usePaging';
import { useGetReasonsQuery } from 'services';
import { FindAllReasonDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useReasonsPaging(params: Omit<FindAllReasonDto, 'pageIndex' | 'pageSize'>) {
  const { keyword } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: reasonsResponse,
    error,
    isLoading,
    isFetching
  } = useGetReasonsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword
  });

  const handleChangePage = changePage;

  return {
    reasons: reasonsResponse?.data.rows || [],
    count: reasonsResponse?.data.count || 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    resetPage,
    handleChangePage
  };
}
