import { OptionCompactDto } from '../options';
import { ServiceTypeFormDto } from './service-type-form.dto';

export type ServiceTypeDto = {
  serviceTypeId: number;

  /** Mã loại dịch vụ */
  code: string;

  /** Tên loại dịch vụ */
  name: string;

  /** ID loại dịch vụ cha */
  parentId?: number;

  /** Loại dịch vụ cha */
  parent?: {
    /** ID loại dịch vụ cha */
    serviceTypeId: number;

    /** Mã loại dịch vụ cha */
    code: string;

    /** Tên loại dịch vụ cha */
    name: string;
  };

  /** Độ ưu tiên */
  priority: number;

  /** Thời hạn xử lý */
  processingDeadline: number;

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

  /** Thiết lập phiếu yêu cầu */
  form: ServiceTypeFormDto;
};
