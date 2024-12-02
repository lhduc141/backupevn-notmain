export type NoteDto = {
  /** ID ghi chú */
  noteId: number;

  /** Nội dung ghi chú */
  content: string;

  /** ID người dùng */
  userId: number;

  /** Thời gian tạo */
  createdAt: string; // định dạng $date-time

  /** Thời gian cập nhật */
  updatedAt: string; // định dạng $date-time

  /** Thời gian xóa */
  deletedAt?: string; // định dạng $date-time, có thể không có
};
