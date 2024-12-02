export type ConversationParticiPantDto = {
  /** ID của người dùng */
  userId: number;

  /** Tên của người dùng */
  name?: string;

  /** Hình ảnh liên kết với người dùng */
  image?: number;

  /** Thời gian người dùng tham gia cuộc trò chuyện */
  joinedAt: Date;

  /** Số lượng tin nhắn chưa đọc */
  unreadCount: number;

  /** Thời gian người dùng rời khỏi cuộc trò chuyện */
  deletedAt?: Date;
};
