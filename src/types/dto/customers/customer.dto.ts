import { OrganizationUnitCompactDto } from '../organization-units';

export type CustomerDto = {
  /** ID của khách hàng */
  customerId: number;

  /** Mã khách hàng */
  customerCode: string;

  /** Tên khách hàng */
  customerName: string;

  /** Địa chỉ của khách hàng */
  customerAddress: string;

  /** Trạng thái của khách hàng (hoạt động hoặc không) */
  status: boolean;

  /** Mã đơn vị / phòng đội */
  organizationUnitCode: string;

  /** Thời gian tạo khách hàng */
  createdAt: Date;

  /** Thời gian cập nhật khách hàng */
  updatedAt?: Date;

  /** Thời gian xóa khách hàng */
  deletedAt?: Date;

  /** Người tạo */
  createdBy: string;

  /** Người cập nhật */
  updatedBy?: string;

  /** Người xóa */
  deletedBy?: string;

  /** Mã của quận/huyện, phường/xã */
  administrativeUnitCode?: string;

  /** Số điện kế của khách hàng */
  meterSerialNumber?: string;

  /** Mã của phiên lộ trình */
  routeCode?: string;

  /** Mã trạm */
  meterPointCode?: string;

  /** Đơn vị / phòng đội */
  organizationUnit?: OrganizationUnitCompactDto;
};
