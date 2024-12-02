import { CreateTicketCancelReasonDto } from './create-ticket-cancel-reason.dto';

export type UpdateTicketCancelReasonDto = Partial<CreateTicketCancelReasonDto> & {
  ticketCancelReasonId: number;
};
