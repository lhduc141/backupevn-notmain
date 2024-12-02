import { MESSAGE_QUERY_TYPE, MESSAGE_TYPE } from 'utils';
import { MessageDto } from './message.dto';
export type FindAllMessageDto = {
  /** ID cuộc trò chuyện */
  conversationId: string;

  /** Loại tin nhắn */
  type?: MESSAGE_TYPE;
  skip?: number;
  limit?: number;
  startMessageId?: string;
  queryType?: MESSAGE_QUERY_TYPE;

  /** reply message */
  message?: MessageDto;
};
