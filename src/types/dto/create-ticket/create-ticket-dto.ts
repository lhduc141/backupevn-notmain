export type CreateTicketDto = {
    requesterInformation: string;
    fullName: string;
    phoneNumber: number;
    address: string;
    ward: string;
    district: string;
    newAddress: boolean;
    citizenIdNumber: number;
    issueDate: string;
    placeOfIssue: string;
    selectReceptionChannel: string;
    selectServiceType: string;
    appointmentDate: string;
    requestContent: string;
    uploadFile: number;
    notMessageSendingRequest: boolean;
    outgoingCall: boolean;
}