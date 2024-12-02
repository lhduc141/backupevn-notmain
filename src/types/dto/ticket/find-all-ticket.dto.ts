import { FindAllDto } from "../common";

export type FindAllTicketDto = FindAllDto & {
    customerCode: string,
    organizationUnitId: number,
    statusId: number,
    channelId: number,
    serviceTypeId: number,
};