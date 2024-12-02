import { usePaging } from 'hooks/usePaging';
import { useGetShiftsQuery } from 'services';
import { FindAllShiftDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useShiftsPaging(params: Omit<FindAllShiftDto, 'pageIndex' | 'pageSize'>) {
  const { keyword } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: shiftsResponse,
    error,
    isLoading,
    isFetching
  } = useGetShiftsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword
  });
  const handleChangePage = changePage;

  return {
    shifts: shiftsResponse?.data.rows,
    count: shiftsResponse ? shiftsResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
