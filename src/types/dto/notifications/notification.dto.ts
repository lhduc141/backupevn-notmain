import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from 'utils';

export type NotificationDto = {
  /** ID của thông báo */
  notificationId: number;

  /** Nội dung thông báo */
  content: string;

  /** Loại thông báo */
  type: NOTIFICATION_TYPE;

  /** Trạng thái của thông báo */
  status: NOTIFICATION_STATUS;

  /** ID tham chiếu (nếu có) */
  refId?: number;

  /** Đánh dấu đã đọc */
  isRead: boolean;

  /** ID người nhận thông báo */
  userId: number;

  /** Thời gian tạo thông báo */
  createdAt: Date;

  /** Thời gian cập nhật thông báo */
  updatedAt: string;

  /** Thời gian xóa thông báo  */
  deletedAt?: string;
};
