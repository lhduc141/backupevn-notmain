import { usePaging } from 'hooks/usePaging';
import { useGetRolesQuery } from 'services';
import { FindAllRoleDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useRolesPaging(params: Omit<FindAllRoleDto, 'pageIndex' | 'pageSize'>) {
  const { keyword } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: rolesResponse,
    error,
    isLoading,
    isFetching
  } = useGetRolesQuery({
    keyword,
    pageIndex: pageIndex,
    pageSize
  });
  const handleChangePage = changePage;

  return {
    roles: rolesResponse?.data.rows || [],
    count: rolesResponse ? rolesResponse.data.count : 0,
    isLoading: isLoading || isFetching,
    error,
    pageIndex,
    handleChangePage,
    resetPage
  };
}
