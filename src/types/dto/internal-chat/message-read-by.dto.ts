export type MessageReadByDto = {
  /** ID của người dùng đã đọc tin nhắn */
  userId: number;

  /** Thời gian tin nhắn được đọc */
  readAt: Date;
};
