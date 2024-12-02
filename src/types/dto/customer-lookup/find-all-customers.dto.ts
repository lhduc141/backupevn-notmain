import { FindAllDto } from "../common";

export type FindAllCustomersDto = FindAllDto & {
    customerName?: string;
    customerAddress?: string;
    meterSerialNumber?: string;
    customerCode?:  string;
    routeCode?: string;
    meterPointCode?: string;
    organizationUnitCode?: string;
    wardId?: string;
    districtId?: string;
}