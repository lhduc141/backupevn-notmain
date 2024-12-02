import { useGetOptionsDefaultQuery } from 'services/options';
import { FindAllOptionsDefaultDto } from 'types';
export function useOptionsDefault({
  optionTypeId,
  service
}: Pick<FindAllOptionsDefaultDto, 'optionTypeId' | 'service'>) {
  const {
    data: optionsResponse,
    error,
    isLoading
  } = useGetOptionsDefaultQuery({
    optionTypeId,
    service
  });

  return {
    optionsDefault: optionsResponse?.data?.rows || [],
    count: optionsResponse?.data?.count || 0,
    isLoading,
    error
  };
}
