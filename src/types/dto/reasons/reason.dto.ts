export type ReasonDto = {
  /** ID lý do */
  reasonId: number;

  /** Mã lý do */
  code: string;

  /** Nội dung lý do */
  content: string;

  /** Trạng thái hoạt động */
  isActive: boolean;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xoá */
  deletedBy?: number;

  /** Thời gian tạo */
  createdAt: Date;

  /** Thời gian cập nhật */
  updatedAt: Date;

  /** Thời gian xoá */
  deletedAt?: Date;
};
