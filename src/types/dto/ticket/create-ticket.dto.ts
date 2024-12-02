export type CreateTicketDto = {
    customerCode: string;
    organizationUnitId: number;
    administrativeUnitId: number;
    customerRequestName: string;
    customerRequestAddress: string;
    customerRequestPhoneNumber: string;
    content: string;
    channelId: number;
    serviceTypeId: number;
    appointmentDate: Date;
    statusId: number,
    upLoad?: number,
}