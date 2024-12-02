import { OptionCompactDto } from '../options';

export type WorkingScheduleDto = {
  /** Mã ID lịch làm việc */
  workingScheduleId: number;

  /** Loại lịch làm việc */
  workingScheduleType: OptionCompactDto;

  /** Ngày */
  applyDate: Date;

  /** Diễn giải */
  description?: string;

  /** Người tạo */
  createdBy: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xóa */
  deletedBy?: number;

  /** Ngày tạo */
  createdAt: Date;

  /** Ngày cập nhật */
  updatedAt?: Date;

  /** Ngày xóa */
  deletedAt?: Date;
};
