import { CreateGroupConversationDto } from './create-group-conversation.dto';

export type UpdateGroupConversationDto = Partial<Omit<CreateGroupConversationDto, 'participants'>> & {
  /** ID của cuộc trò chuyện */
  conversationId: string;
};
