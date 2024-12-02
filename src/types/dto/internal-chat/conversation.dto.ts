import { CONVERSATION_TYPE } from 'utils';
import { ConversationParticiPantDto } from './conversation-participant.dto';
import { MessageDto } from './message.dto';

export type ConversationDto = {
  /** ID của cuộc trò chuyện */
  conversationId: string;

  /** Loại cuộc trò chuyện */
  type: CONVERSATION_TYPE;

  /** Danh sách người tham gia trong cuộc trò chuyện */
  participants: ConversationParticiPantDto[];

  /** Tin nhắn cuối cùng trong cuộc trò chuyện */
  lastMessage?: MessageDto;

  /** Tên của cuộc trò chuyện */
  name?: string;

  /** Hình ảnh liên kết với cuộc trò chuyện */
  image?: number;

  /** ID của quản trị viên */
  adminId?: number;

  /** ID của người tạo cuộc trò chuyện */
  createdBy?: number;

  /** ID của người cập nhật cuộc trò chuyện lần cuối */
  updatedBy?: number;

  /** ID của người đã xoá cuộc trò chuyện */
  deletedBy?: number;

  /** Thời gian cuộc trò chuyện được tạo */
  createdAt: Date;

  /** Thời gian cuộc trò chuyện được cập nhật lần cuối */
  updatedAt: Date;

  /** Thời gian cuộc trò chuyện bị xoá */
  deletedAt?: Date;
};
