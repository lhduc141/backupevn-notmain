import { Rule } from "antd/es/form";
import { CreateTicketFormType } from "components/create-ticket/CreateTicketForm";

export const createTicketValidationRules: Record<keyof CreateTicketFormType, Rule[]> = {
    customerCode: [{ required: true }],
    organizationUnitId: [],
    administrativeUnitId: [],
    customerRequestName: [{ required: true }],
    customerRequestAddress: [{ required: true }],
    customerRequestPhoneNumber: [{ required: true }],
    content: [{ required: true }],
    channelId: [{ required: true }],
    serviceTypeId: [{ required: true }],
    appointmentDate: [{ required: true }],
    statusId: [],
    upLoad: [],
}