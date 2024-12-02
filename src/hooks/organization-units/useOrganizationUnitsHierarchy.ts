import { useGetOrganizationUnitsHierarchyQuery } from 'services/organization-units';
import { FindOrganizationUnitHierarchyDto } from 'types';
export function useOrganizationUnitsHierarchy({
  keyword,
  organizationUnitId,
  parentId,
  organizationUnitClassifyId,
  serviceTypeId
}: FindOrganizationUnitHierarchyDto) {
  const {
    data: organizationUnitsResponse,
    error,
    isLoading,
    isFetching
  } = useGetOrganizationUnitsHierarchyQuery({
    keyword,
    organizationUnitId,
    parentId,
    organizationUnitClassifyId,
    serviceTypeId
  });

  return {
    organizationsUnitsHierarchy: organizationUnitsResponse?.data || [],
    isLoading: isFetching || isLoading,
    error
  };
}
