import { useGetCustomerSupportInformationActiveQuery } from 'services';
export function useCustomerSupportInformationActive() {
  const {
    data: customerSupportInformationResponse,
    error,
    isLoading,
    isFetching
  } = useGetCustomerSupportInformationActiveQuery();
  return {
    data: customerSupportInformationResponse?.data.rows,
    count: customerSupportInformationResponse ? customerSupportInformationResponse.data.count : 0,
    isLoading: isFetching || isLoading,
    error
  };
}
