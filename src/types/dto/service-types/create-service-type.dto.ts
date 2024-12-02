import { CreateServiceTypeFormDto } from './create-service-type-form.dto';

export type CreateServiceTypeDto = {
  /** Mã loại dịch vụ */
  code: string; // maxLength: 50

  /** Tên loại dịch vụ */
  name: string; // maxLength: 255

  /** ID loại dịch vụ cha */
  parentId?: number;

  /** Độ ưu tiên */
  priority?: number;

  /** Thời hạn xử lý */
  processingDeadline: number;

  /** Trạng thái hoạt động */
  isActive?: boolean;

  /** Thiết lập phiếu yêu cầu */
  form: CreateServiceTypeFormDto;
};
