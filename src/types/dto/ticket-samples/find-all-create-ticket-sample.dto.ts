import { FindAllDto } from '../common';

export type FindAllTicketSampleDto = FindAllDto & {
  serviceTypeId?: number[];
  isActive?: boolean;
};
