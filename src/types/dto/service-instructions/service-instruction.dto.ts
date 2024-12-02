export type ServiceInstructionDto = {
  /** Mã hướng dẫn dịch vụ */
  serviceInstructionId: number;

  /** Mã loại dịch vụ */
  serviceTypeId: number;

  /** Thông tin chung */
  general?: string;

  /** Chi tiết */
  detail?: string;

  /** Hồ sơ */
  profile?: string;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xóa */
  deletedBy?: number;

  /** Ngày tạo */
  createdAt: string;

  /** Ngày cập nhật */
  updatedAt: string;

  /** Ngày xóa */
  deletedAt?: string;
};
