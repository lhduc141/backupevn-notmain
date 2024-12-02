import { useGetServiceInstructionsHierarchyQuery } from 'services';
import { FindWithKeywordDto } from 'types';
export function useServiceInstructionsHierarchy({ keyword }: FindWithKeywordDto) {
  const {
    data: serviceTypesResponse,
    error,
    isLoading,
    isFetching
  } = useGetServiceInstructionsHierarchyQuery({
    keyword
  });

  return {
    serviceTypesWithInstructionsHierarchy: serviceTypesResponse?.data || [],
    isLoading: isFetching || isLoading,
    error
  };
}
