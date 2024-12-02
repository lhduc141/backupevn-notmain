import { OptionCompactDto } from '../options';

export type ServiceTypeFormDto = {
  /** ID biểu mẫu loại dịch vụ */
  serviceTypeFormId: number;

  /** ID loại dịch vụ */
  serviceTypeId: number;

  /** Người yêu cầu */
  requester: boolean;

  /** Địa chỉ */
  address: boolean;

  /** Phường/Quận */
  area: boolean;

  /** Đây là địa chỉ mới */
  isNewAddress: boolean;

  /** Điện thoại liên lạc */
  contactPhone: boolean;

  /** Kênh tiếp nhận */
  receivingChannel: boolean;

  /** Thông tin CCCD */
  cccdInformation: boolean;

  /** Loại dịch vụ */
  serviceType: boolean;

  /** Ngày hẹn */
  appointmentDate: boolean;

  /** Tệp tải lên */
  file: boolean;

  /** Nội dung yêu cầu */
  requestContent: boolean;

  /** Không phải yêu cầu gửi SMS */
  notRequestToSendSms: boolean;

  /** Đây là cuộc gọi ra */
  isCalledOut: boolean;

  /** Tình trạng lưới điện */
  electricalStatus: boolean;

  /** Ngày giờ mất điện */
  outageAt: boolean;

  /** Nguyên nhân */
  reason: boolean;

  /** Mất điện cả khu vực */
  outageEntireArea: boolean;

  /** ĐL không cập nhật QLMĐ */
  notUpdateOutageManagement: boolean;

  /** Địa chỉ sự cố */
  incidentAddress: boolean;

  /** Phường/Quận sự cố */
  incidentArea: boolean;

  /** Số pha */
  phaseNumber: boolean;

  /** Mục đích sử dụng */
  intendedUse: boolean;

  /** Các giấy tờ khách hàng cần chuẩn bị */
  documentsCustomerNeedToPrepare: boolean;

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
};
