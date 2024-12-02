export type UpdateGroupConversationAdminDto = {
  /** ID của cuộc trò chuyện */
  conversationId: string;

  /** ID của quản trị viên */
  adminId?: number;
};
