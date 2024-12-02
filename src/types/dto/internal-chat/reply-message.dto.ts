import { MESSAGE_TYPE } from 'utils';
import { CreateMessageDto } from './create-message.dto';

export type ReplyMessageDto = Pick<CreateMessageDto, 'content' | 'fileId' | 'type'> & {
  /** ID tin nhắn đã reply */
  messageId: string;
};
