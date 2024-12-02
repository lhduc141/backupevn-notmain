export type CreateFrequentlyAskedQuestionDto = {
  /** Tiêu đề */
  title: string;

  /** Nội dung */
  content: string;

  /** Từ khoá (tối đa 512 ký tự) */
  keyword: string;

  /** ID loại dịch vụ */
  serviceTypeId: number | null;

  /** Độ ưu tiên */
  priority: number;

  /** Trạng thái hoạt động */
  isActive: boolean;
};
