import { useGetServiceTypesHierarchyQuery } from 'services';
import { FindWithKeywordDto } from 'types';
export function useServiceTypesHierarchy({ keyword }: FindWithKeywordDto) {
  const {
    data: serviceTypesResponse,
    error,
    isLoading,
    isFetching
  } = useGetServiceTypesHierarchyQuery({
    keyword
  });

  return {
    serviceTypesHierarchy: serviceTypesResponse?.data,
    isLoading: isFetching || isLoading,
    error
  };
}
