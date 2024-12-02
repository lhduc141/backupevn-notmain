import { usePaging } from 'hooks/usePaging';
import { useGetPermissionsQuery } from 'services';
import { FindAllPermissionDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function usePermissionsPaging(params: Omit<FindAllPermissionDto, 'pageIndex' | 'pageSize'>) {
  const { keyword } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: permissionsResponse,
    error,
    isLoading,
    isFetching
  } = useGetPermissionsQuery({
    keyword,
    pageIndex: pageIndex,
    pageSize
  });
  const handleChangePage = changePage;

  return {
    permissions: permissionsResponse?.data.rows || [],
    count: permissionsResponse ? permissionsResponse.data.count : 0,
    pageIndex,
    isLoading: isLoading || isFetching,
    error,
    handleChangePage,
    resetPage
  };
}
