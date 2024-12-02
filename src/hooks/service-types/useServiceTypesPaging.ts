import { usePaging } from 'hooks/usePaging';
import { useGetServiceTypesQuery } from 'services';
import { FindAllServiceTypeDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useServiceTypesPaging(params: Omit<FindAllServiceTypeDto, 'pageIndex' | 'pageSize'>) {
  const { isActive, parentId, keyword } = params;
  const { pageIndex, changePage } = usePaging(params);

  const {
    data: serviceTypesResponse,
    error,
    isLoading,
    isFetching
  } = useGetServiceTypesQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    parentId,
    isActive
  });
  const handleChangePage = changePage;
  return {
    serviceTypes: serviceTypesResponse?.data.rows,
    count: serviceTypesResponse ? serviceTypesResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage
  };
}
