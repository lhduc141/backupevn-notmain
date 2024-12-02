import { useGetAllShiftsOptionsQuery } from 'services';
import { UseQueryOptionsType } from 'types';

export function useAllShiftsOptions(options?: UseQueryOptionsType) {
  const {
    data: shiftsOptionsResponse,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetAllShiftsOptionsQuery(undefined, {
    ...options
  });

  return {
    shiftsOptions: shiftsOptionsResponse?.data,
    count: shiftsOptionsResponse ? Object.values(shiftsOptionsResponse.data).length : 0,
    isLoading: isFetching || isLoading,
    refetch,
    error
  };
}
