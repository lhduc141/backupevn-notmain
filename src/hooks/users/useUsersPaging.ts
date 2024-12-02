import { usePaging } from 'hooks/usePaging';
import { useGetUsersQuery } from 'services';
import { FindAllUserDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useUsersPaging(params: Omit<FindAllUserDto, 'pageSize'>) {
  const { keyword, organizationUnitId, statusId, userGroupId } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);
  const {
    data: usersResponse,
    error,
    isFetching,
    isLoading
  } = useGetUsersQuery(
    {
      pageIndex,
      pageSize,
      keyword,
      organizationUnitId,
      statusId,
      userGroupId
    },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const handleChangePage = changePage;

  return {
    users: usersResponse?.data.rows,
    count: usersResponse ? usersResponse.data.count : 0,
    isLoading: isFetching || isLoading,
    pageIndex,
    handleChangePage,
    resetPage,
    error
  };
}
