import { usePaging } from 'hooks/usePaging';
import { useGetInternalAnnouncementsStatisticsQuery } from 'services';
import { FindAllInternalAnnouncementStatisticDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useInternalAnnouncementsStatisticPaging(
  params: Omit<FindAllInternalAnnouncementStatisticDto, 'pageIndex' | 'pageSize'>
) {
  const { internalAnnouncementId } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: dataResponse,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetInternalAnnouncementsStatisticsQuery(
    {
      pageIndex: pageIndex,
      pageSize,
      internalAnnouncementId
    },
    {
      skip: !internalAnnouncementId
    }
  );
  const handleChangePage = changePage;

  return {
    data: dataResponse?.data.rows,
    count: dataResponse ? dataResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage,
    resetPage,
    refetch
  };
}
