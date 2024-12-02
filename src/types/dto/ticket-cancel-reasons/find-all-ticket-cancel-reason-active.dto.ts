import { FindWithKeywordDto } from '../common';

export type FindAllTicketCancelReasonActiveDto = FindWithKeywordDto & {
  /** ID loại dịch vụ */
  serviceTypeId?: number[];
};
