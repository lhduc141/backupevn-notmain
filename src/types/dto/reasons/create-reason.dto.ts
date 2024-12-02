export type CreateReasonDto = {
  /** Mã lý do */
  code?: string;

  /** Tên lý do */
  content: string;

  /** Trạng thái hoạt động */
  isActive?: boolean;
};
