import { ServiceTypeCompactDto } from '../service-types';

export type TicketCancelReasonDto = {
  /** ID lý do */
  ticketCancelReasonId: number;

  /** Nội dung lý do */
  content: string;

  /** Trạng thái hoạt động */
  isActive: boolean;

  /** Người tạo */
  createdBy: number;

  /** Người cập nhật */
  updatedBy: number;

  /** Người xóa */
  deletedBy?: number;

  /** Thời gian tạo */
  createdAt: string;

  /** Thời gian cập nhật */
  updatedAt: string;

  /** Thời gian xóa */
  deletedAt?: string;

  /** Danh sách loại dịch vụ */
  serviceTypes: ServiceTypeCompactDto[];
};
