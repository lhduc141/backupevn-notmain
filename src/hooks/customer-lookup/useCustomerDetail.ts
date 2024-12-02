import { useGetCustomerDetailQuery } from "services/customer-lookup";
export function useCustomerDetail(customerId: number) {
    const { data: customerRes, isLoading } = useGetCustomerDetailQuery(customerId!, {
        skip: !customerId,
        refetchOnMountOrArgChange: true
    });

    return {
        customer: customerRes?.data,
        isLoading
    };
}