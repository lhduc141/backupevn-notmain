import { Metadata } from 'types/metadata.type';
import { MESSAGE_REF_TYPE, MESSAGE_TYPE } from 'utils';
import { MessageReadByDto } from './message-read-by.dto';
import { FileUpload } from 'types/file-upload.type';

export type MessageDto = {
  /** ID của tin nhắn */
  messageId: string;

  /** ID của cuộc trò chuyện mà tin nhắn thuộc về */
  conversationId: string;

  /** ID của người gửi tin nhắn */
  senderId?: number;

  /** Nội dung của tin nhắn */
  content: string;

  /** ID tệp */
  fileId?: number | number[] | FileUpload | FileUpload[];

  /** Loại tin nhắn */
  type: MESSAGE_TYPE;

  /** Thời gian tin nhắn được gửi */
  sentAt?: Date;

  /** Danh sách những người đã đọc tin nhắn */
  readBy?: MessageReadByDto[];

  /** metadata fetch by url in content */
  metadata?: Metadata;

  refMessage?: MessageDto;

  refType?: MESSAGE_REF_TYPE;

  status?: 'pending' | 'success' | 'failure';
};
