import { usePaging } from 'hooks/usePaging';
import { useGetWorkingSchedulesQuery } from 'services';
import { FindAllWorkingScheduleDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useWorkingSchedulesPaging(params: Omit<FindAllWorkingScheduleDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, workingScheduleTypeId } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: workingSchedulesResponse,
    error,
    isLoading,
    isFetching
  } = useGetWorkingSchedulesQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    workingScheduleTypeId
  });
  const handleChangePage = changePage;

  return {
    workingSchedules: workingSchedulesResponse?.data.rows,
    count: workingSchedulesResponse ? workingSchedulesResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage
  };
}
