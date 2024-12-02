import { OrganizationUnitCompactDto } from '../organization-units';

export type InternalAnnouncementOrganizationUnitDto = {
  /** ID đơn vị/phòng đội thông báo nội bộ */
  internalAnnouncementOrganizationUnitId: number;

  /** ID thông báo nội bộ */
  internalAnnouncementId: number;

  /** ID đơn vị/phòng đội */
  organizationUnitId: number;

  /** Thông tin đơn vị/phòng đội */
  organizationUnit: OrganizationUnitCompactDto;

  /** Người tạo */
  createdBy?: Record<string, any>;

  /** Người cập nhật */
  updatedBy?: Record<string, any>;

  /** Người xóa */
  deletedBy?: Record<string, any>;

  /** Thời gian tạo */
  createdAt: string;

  /** Thời gian cập nhật */
  updatedAt: string;

  /** Thời gian xóa */
  deletedAt?: string;
};
