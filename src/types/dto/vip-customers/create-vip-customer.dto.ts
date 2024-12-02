export type CreateVipCustomerDto = {
  /** Mã khách hàng VIP (tối đa 50 ký tự) */
  code: string;

  /** Tên khách hàng VIP (tối đa 50 ký tự) */
  name: string;

  /** Ghi chú */
  note?: string;

  /** Màu sắc đại diện cho khách hàng VIP */
  color?: string;

  /** Số điện thoại khách hàng VIP (tối đa 20 ký tự) */
  phoneNumber?: string;
};
