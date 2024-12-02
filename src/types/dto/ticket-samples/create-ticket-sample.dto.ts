export type CreateTicketSampleDto = {
  /** ID loại dịch vụ */
  serviceTypeId: number;

  /** Tên mẫu (tối đa 10 ký tự) */
  title: string;

  /** Nội dung mẫu */
  content: string;

  /** Nội dung tóm tắt mẫu */
  summary?: string;

  /** Phím tắt (tối đa 10 ký tự) */
  hotkey?: string;

  /** Trạng thái */
  isActive: boolean;
};
