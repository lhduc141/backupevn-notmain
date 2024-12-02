import { MESSAGE_TYPE } from 'utils';

export type CreateMessageDto = {
  /** ID cuộc trò chuyện */
  conversationId: string;

  /** Nội dung tin nhắn */
  content?: string;

  /** file upload */
  fileId?: number | number[];

  /** Loại tin nhắn */
  type?: MESSAGE_TYPE;
};
