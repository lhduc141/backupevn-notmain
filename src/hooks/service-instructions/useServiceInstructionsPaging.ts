import { usePaging } from 'hooks/usePaging';
import { useGetServiceInstructionsQuery } from 'services';
import { FindAllServiceInstructionsDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useServiceInstructionsPaging(params: Omit<FindAllServiceInstructionsDto, 'pageIndex' | 'pageSize'>) {
  const { isActive, parentId, keyword } = params;
  const { pageIndex, changePage } = usePaging(params);

  const {
    data: serviceTypesResponse,
    error,
    isLoading,
    isFetching
  } = useGetServiceInstructionsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    parentId,
    isActive
  });
  const handleChangePage = changePage;

  return {
    serviceTypesWithInstructions: serviceTypesResponse?.data.rows,
    count: serviceTypesResponse ? serviceTypesResponse.data.count : 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage
  };
}
