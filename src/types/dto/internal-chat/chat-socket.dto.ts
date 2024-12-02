export type SendMessageDto = {
  conversationId: string;
  content: string;
  type?: any;
};

export type JoinConversationDto = {
  conversationId: string;
};

export type TypingDto = {
  conversationId: string;

  isTyping: boolean;
};

export type UserTypingDto = TypingDto & {
  userId: number;
};

export type OutConversationDto = {
  conversationId: string;
};
