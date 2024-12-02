import { usePaging } from 'hooks/usePaging';
import { useGetUserGroupsQuery } from 'services/user-groups';
import { FindAllUserGroupDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useUserGroupsPaging(params: Omit<FindAllUserGroupDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, organizationUnitId, userGroupClassifyId } = params;
  const { pageIndex, changePage, resetPage } = usePaging(params);

  const {
    data: userGroupsResponse,
    error,
    isLoading,
    isFetching
  } = useGetUserGroupsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    organizationUnitId,
    userGroupClassifyId
  });
  const handleChangePage = changePage;
  return {
    userGroups: userGroupsResponse?.data.rows,
    count: userGroupsResponse ? userGroupsResponse.data.count : 0,
    pageIndex,
    isLoading: isLoading || isFetching,
    error,
    handleChangePage,
    resetPage
  };
}
