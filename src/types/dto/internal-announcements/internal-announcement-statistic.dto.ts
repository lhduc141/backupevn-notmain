import { OrganizationUnitCompactDto } from '../organization-units';
import { UserCompactDto, UserRecordDto } from '../users';

export interface InternalAnnouncementStatisticDto {
  /** ID thống kê thông báo nội bộ */
  internalAnnouncementStatisticId: number;

  /** ID thông báo nội bộ */
  internalAnnouncementId: number;

  /** ID người dùng */
  userId: number;

  /** Người dùng */
  user: UserRecordDto;

  /** ID đơn vị / phòng đội */
  organizationUnitId: number;

  /** Thông tin đơn vị / phòng đội */
  organizationUnit: OrganizationUnitCompactDto;

  /** Lượt xem */
  viewedCount: number;

  /** Đã xem lúc  */
  viewedAt: string;

  /** Đã xác nhận lúc  */
  confirmedAt?: string;

  /** Thời gian tạo */
  createdAt: string;

  /** Thời gian cập nhật */
  updatedAt: string;

  /** Thời gian xóa  */
  deletedAt?: string;
}
