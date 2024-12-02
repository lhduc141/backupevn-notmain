import { DEFAULT_PAGE_SIZE } from 'utils';
import { FindAllCustomersDto } from 'types/dto/customer-lookup/find-all-customers.dto';
import { useGetCustomersQuery } from 'services/customer-lookup';
import { usePaging } from 'hooks/usePaging';

const pageSize = DEFAULT_PAGE_SIZE;
export function useCustomersPaging(params: Omit<FindAllCustomersDto, 'pageIndex' | 'pageSize'>) {
    const {
            customerName,
            customerAddress,
            meterSerialNumber,
            customerCode,
            routeCode,
            meterPointCode
    } = params;
    const { pageIndex, changePage, resetPage } = usePaging(params);
    const { 
        data: customersResponse,
        error,
        isLoading,
        isFetching
    } = useGetCustomersQuery (
        {
            pageIndex,
            pageSize,
            customerName,
            customerAddress,
            meterSerialNumber,
            customerCode,
            routeCode,
            meterPointCode,
        },

    );
    const handleChangePage = changePage;

    return {
        customers: customersResponse?.data.rows || [],
        count: customersResponse ? customersResponse.data.count : 0,
        pageIndex,
        isLoading: isLoading || isFetching,
        error,
        handleChangePage,
        resetPage,
    };
}

