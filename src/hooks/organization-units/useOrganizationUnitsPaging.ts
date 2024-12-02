import { usePaging } from 'hooks/usePaging';
import { useGetOrganizationUnitsQuery } from 'services/organization-units';
import { FindAllOrganizationUnitDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useOrganizationUnitsPaging(params: Omit<FindAllOrganizationUnitDto, 'pageIndex' | 'pageSize'>) {
  const { keyword, parentId, organizationUnitId, organizationUnitClassifyId, serviceTypeId } = params;
  const { pageIndex, changePage } = usePaging(params);
  const {
    data: organizationUnitsResponse,
    error,
    isLoading,
    isFetching
  } = useGetOrganizationUnitsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    parentId,
    organizationUnitId,
    organizationUnitClassifyId,
    serviceTypeId
  });

  const handleChangePage = changePage;

  return {
    organizationsUnits: organizationUnitsResponse?.data.rows || [],
    count: organizationUnitsResponse?.data.count || 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    handleChangePage
  };
}
