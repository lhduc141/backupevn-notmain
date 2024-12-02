import { OptionCompactDto } from '../options';
import { OrganizationUnitCompactDto } from '../organization-units';

export type InternalAnnouncementDto = {
  /** ID thông báo nội bộ */
  internalAnnouncementId: number;

  /** Đơn vị/phòng đội */
  organizationUnits?: OrganizationUnitCompactDto[];

  /** Tiêu đề */
  title: string;

  /** Nội dung */
  content: string;

  /** Tệp đính kèm */
  files: number[];

  /** Yêu cầu xác nhận */
  isRequestConfirm: boolean;

  /** Độ ưu tiên */
  priority: number;

  /** ID trạng thái */
  statusId: number;

  /** Trạng thái */
  status: OptionCompactDto;

  /** Lượt xem */
  viewedCount: number;

  /** Lượt xác nhận */
  confirmedCount: number;

  /** Người tạo */
  createdBy?: Record<string, any>;

  /** Người cập nhật */
  updatedBy?: Record<string, any>;

  /** Người xóa */
  deletedBy?: Record<string, any>;

  /** Thời gian tạo */
  createdAt: Date;

  /** Thời gian cập nhật */
  updatedAt: string;

  /** Thời gian xóa */
  deletedAt?: string;

  /** Thời gian xem gần nhất */
  viewAt?: string;
};
