export type SystemConfigDto = {
  /** Api Url của hệ thống đánh giá */
  ratingSystemApiUrl?: string;

  /** Khóa Api của hệ thống đánh giá */
  ratingSystemApiKey?: string;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xoá */
  deletedBy?: number;

  /** Thời gian tạo */
  createdAt: string;

  /** Thời gian cập nhật */
  updatedAt: string;

  /** Thời gian xoá */
  deletedAt?: string;
};
