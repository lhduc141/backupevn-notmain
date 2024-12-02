export type CreateInternalAnnouncementDto = {
  /** ID đơn vị/phòng đội */
  organizationUnitIds: number[];

  /** Tiêu đề */
  title: string;

  /** Nội dung */
  content: string;

  /** Tệp đính kèm */
  files?: number[];

  /** Yêu cầu xác nhận */
  isRequestConfirm?: boolean;

  /** Độ ưu tiên */
  priority?: number;
};
