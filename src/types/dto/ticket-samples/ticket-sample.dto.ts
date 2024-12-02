import { ServiceTypeDto } from '../service-types';

export type TicketSampleDto = {
  /** ID mẫu nội dung phiếu yêu cầu */
  ticketSampleId: number;

  /** ID loại dịch vụ */
  serviceTypeId: number;

  /** Loai dịch vụ */

  serviceType?: ServiceTypeDto;

  /** Tên mẫu */
  title: string;

  /** Nội dung mẫu */
  content: string;

  /** Nội dung tóm tắt mẫu */
  summary?: string;

  /** Phím tắt */
  hotkey?: string;

  /** Trạng thái */
  isActive: boolean;

  /** Người tạo */
  createdBy: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xóa */
  deletedBy?: number;

  /** Thời gian tạo */
  createdAt: string;

  /** Thời gian cập nhật */
  updatedAt?: string;

  /** Thời gian xóa */
  deletedAt?: string;
};
