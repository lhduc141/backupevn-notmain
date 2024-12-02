import { internalChatMessages } from 'messages';
import { ConversationParticiPantDto, MessageDto } from 'types';

export const calculateHeightMessageSystem = (
  message: MessageDto,
  props?: {
    isFirstOfSender?: boolean;
    isGroup?: boolean;
    isMe?: boolean;
    sender?: ConversationParticiPantDto;
  }
): number => {
  if (!message) return 0;

  const clone = document.createElement('div');
  clone.className = 'relative min-w-[70px] max-w-[700px] whitespace-pre-wrap break-words px-3 py-2 text-center text-sm';
  clone.innerHTML = `${props?.isMe ? internalChatMessages.you : props?.sender?.name} ${message.content}`;
  document.body.appendChild(clone);
  const height = clone.offsetHeight;
  document.body.removeChild(clone);
  return height;
};
