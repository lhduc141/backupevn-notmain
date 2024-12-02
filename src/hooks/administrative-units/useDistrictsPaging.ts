import { usePaging } from "hooks/usePaging";
import { useGetDistrictsQuery } from "services/administrative-units";
import { FindAllAdministrativeUnitDto } from "types/dto/administrativeUnit/find-all-administrativeUnit.dto";
import { DEFAULT_PAGE_SIZE } from "utils";

const pageSize = DEFAULT_PAGE_SIZE;
export function useDistrictsPaging(params: Omit<FindAllAdministrativeUnitDto, 'pageIndex' | 'pageSize'>) {
    const {pageIndex, changePage} = usePaging(params);
    const {
        data: districtsResponse,
        error,
        isLoading,
        isFetching
    } = useGetDistrictsQuery({
        pageIndex: pageIndex,
        pageSize
    });
    const handleChangePage = changePage;
    return {
        districts: districtsResponse?.data.rows,
        count: districtsResponse ? districtsResponse.data.count: 0,
        pageIndex,
        isLoading: isFetching || isLoading,
        error,
        handleChangePage
    }
}