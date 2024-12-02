import { AdministrativeUnitCompactDto } from "../administrativeUnit";
import { ChannelCompactDto } from "../channel";
import { ServiceTypeCompactDto } from "../service-types";
import { TicketStatusCompactDto } from "./ticket-status-compact.dto";

export type TicketDto = {
    ticketId : number;
    customerCode: string;
    organizationUnitCode: string;
    customerRequestName: string;
    customerRequestPhoneNumber: string;
    customerRequestAddress: string;
    numOfRequests: number;
    content: string;
    isPriority: boolean;
    isDoubleCheck: boolean;
    isRequestMultipleTime: boolean;
    isNotOnTime: boolean;
    channelId: number;
    channel: ChannelCompactDto;
    serviceTypeId: number;
    serviceType: ServiceTypeCompactDto;
    administrativeUnitId: number;
    administrativeUnit: AdministrativeUnitCompactDto;
    cmisRequestId: string;
    appointmentDate: string;
    statusId: number;
    status: TicketStatusCompactDto;
    latitude: number;
    longitude: number;
    createdBy: number;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
    upLoad?: number,
}