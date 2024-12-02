import { TicketStatusDto } from "./ticket-status.dto";

export type TicketStatusCompactDto = Pick<
    TicketStatusDto,
    'optionId' | 'code' | 'name'
>;