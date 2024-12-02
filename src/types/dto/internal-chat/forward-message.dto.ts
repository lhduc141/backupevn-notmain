export type ForwardMessageDto = {
  /** ID tin nhắn chuyển tiếp */
  messageId: string;

  /** ID người nhận */
  receiverId?: number;

  /** ID cuộc trò chuyện */
  conversationId?: string;
};
