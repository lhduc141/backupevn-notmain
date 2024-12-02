import { UserCompactDto } from '../users';

export type InternalAnnouncementActiveDto = {
  /** ID thông báo nội bộ */
  internalAnnouncementId: number;

  /** Tiêu đề */
  title: string;

  /** Nội dung */
  content: string;

  /** Tệp đính kèm */
  files: number[];

  /** Yêu cầu xác nhận */
  isRequestConfirm: boolean;

  /** Người tạo */
  createdBy?: UserCompactDto;

  /** Người cập nhật */
  updatedBy?: UserCompactDto;

  /** Thời gian tạo */
  createdAt: Date;

  /** Thời gian cập nhật */
  updatedAt: string;

  /** Đã xác nhận lúc */
  confirmedAt: Date;
};
