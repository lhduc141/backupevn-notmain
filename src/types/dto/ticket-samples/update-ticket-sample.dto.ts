import { CreateTicketSampleDto } from './create-ticket-sample.dto';

export type UpdateTicketSampleDto = Partial<CreateTicketSampleDto> & {
  ticketSampleId: number;
};
