import { FindAllDto } from '../common';

export type FindAllCustomerDto = FindAllDto & {
  /** Từ khóa tìm kiếm tên khách hàng */
  customerName?: string;

  /** Từ khóa tìm kiếm địa chỉ khách hàng */
  customerAddress?: string;

  /** Từ khóa tìm kiếm số điện kế của khách hàng */
  meterSerialNumber?: string;

  /** Từ khóa tìm kiếm mã khách hàng */
  customerCode?: string;

  /** Từ khóa tìm kiếm mã phiên lộ trình của khách hàng */
  routeCode?: string;

  /** Từ khóa tìm kiếm mã trạm của khách hàng */
  meterPointCode?: string;

  /** Mã đơn vị / phòng ban của khách hàng */
  organizationUnitCode?: string;

  /** ID phường/xã của khách hàng */
  wardId?: number;

  /** ID quận/huyện của khách hàng */
  districtId?: number;
};
