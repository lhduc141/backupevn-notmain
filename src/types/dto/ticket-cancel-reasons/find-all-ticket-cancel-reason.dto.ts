import { FindAllDto } from '../common';

export type FindAllTicketCancelReasonDto = FindAllDto & {
  /** ID loại dịch vụ */
  serviceTypeId?: number[];
  /** Trạng thái hoạt động */
  isActive?: boolean;
};
