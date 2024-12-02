export type CreateShiftDto = {
  /** Mã ca trực */
  code?: string;

  /** Tên ca trực */
  name: string;

  /** Thời gian bắt đầu ca trực */
  fromTime: string;

  /** Thời gian kết thúc ca trực */
  toTime: string;

  /** Trạng thái hoạt động */
  isActive?: boolean;

  icon: number;
};
