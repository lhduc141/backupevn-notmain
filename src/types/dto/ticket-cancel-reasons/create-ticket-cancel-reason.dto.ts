export type CreateTicketCancelReasonDto = {
  /** Nội dung lý do */
  content: string;

  /** Danh sách ID loại dịch vụ  */
  serviceTypeIds: number[];

  /** Trạng thái hoạt động */
  isActive: boolean;
};
