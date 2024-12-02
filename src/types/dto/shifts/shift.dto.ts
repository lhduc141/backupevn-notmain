export type ShiftDto = {
  /** ID ca trực */
  shiftId: number;

  /** Mã ca trực */
  code: string;

  /** Tên ca trực */
  name: string;

  /** Thời gian bắt đầu ca trực */
  fromTime: string;

  /** Thời gian kết thúc ca trực */
  toTime: string;

  /** Trạng thái hoạt động */
  isActive: boolean;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xoá */
  deletedBy?: number;

  /** Thời gian tạo */
  createdAt: string;

  /** Thời gian cập nhật */
  updatedAt?: string;

  /** Thời gian xoá */
  deletedAt?: string;

  /**ID biểu tượng */
  icon: number;
};
