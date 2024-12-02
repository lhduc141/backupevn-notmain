import { AdministrativeUnitDto } from "./administrativeUnit.dto";

export type AdministrativeUnitCompactDto = Pick<
    AdministrativeUnitDto,
    'administrativeUnitId' | 'administrativeUnitCode' | 'administrativeUnitName'
>;