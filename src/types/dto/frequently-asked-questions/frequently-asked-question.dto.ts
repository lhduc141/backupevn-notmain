import { ServiceTypeCompactDto } from '../service-types';

export type FrequentlyAskedQuestionDto = {
  /** ID  hỏi đáp kb*/
  frequentlyAskedQuestionId: number;

  /** Tiêu đề */
  title: string;

  /** Nội dung */
  content: string;

  /** Từ khoá */
  keyword: string;

  /** ID loại dịch vụ */
  serviceTypeId?: number;

  /** Thông tin loại dịch vụ dạng tóm gọn */
  serviceType?: ServiceTypeCompactDto;

  /** Độ ưu tiên */
  priority: number;

  /** Trạng thái hoạt động */
  isActive: boolean;

  /** Người tạo */
  createdBy: number;

  /** Người cập nhật */
  updatedBy: number;

  /** Người xoá */
  deletedBy: number;

  /** Thời gian tạo (định dạng ngày-giờ) */
  createdAt: Date;

  /** Thời gian cập nhật (định dạng ngày-giờ) */
  updatedAt: Date;

  /** Thời gian xoá (định dạng ngày-giờ) */
  deletedAt?: Date;
};

export type FrequentlyAskedQuestionOmitContentDto = Omit<FrequentlyAskedQuestionDto, 'content'>;
