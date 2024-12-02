export type VipCustomerDto = {
  /** ID khách hàng VIP */
  vipCustomerId: number;

  /** Mã khách hàng VIP */
  code: string;

  /** Tên khách hàng VIP */
  name: string;

  /** Ghi chú */
  note?: string;

  /** Màu sắc đại diện cho khách hàng VIP */
  color?: string;

  /** Số điện thoại */
  phoneNumber?: string;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xóa */
  deletedBy?: number;

  /** Thời gian tạo */
  createdAt: Date;

  /** Thời gian cập nhật */
  updatedAt: Date;

  /** Thời gian xóa */
  deletedAt?: Date;
};
