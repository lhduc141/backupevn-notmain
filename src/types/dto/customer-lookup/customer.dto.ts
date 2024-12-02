import { OrganizationUnitCompactDto } from "../organization-units";

export type CustomerDto = {
    customerId: number;
    customerCode: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    status: boolean;
    organizationUnitCode: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    administrativeUnitCode: string;
    meterSerialNumber: string;
    routeCode: string;
    meterPointCode: string;
    organizationUnit: OrganizationUnitCompactDto;
}