import { useProfile } from 'hooks';
import { internalChatMessages } from 'messages';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConversationParticiPantDto, MessageDto } from 'types';

type MessageSystemProps = {
  data: MessageDto;
  sender?: ConversationParticiPantDto;
};

const MessageSystem: React.FC<MessageSystemProps> = ({ data, sender }) => {
  const { profile } = useProfile();
  const isMe = data.senderId === profile?.userId;

  return (
    <div
      className={twMerge(
        'relative min-w-[70px] max-w-[700px] whitespace-pre-wrap break-words px-3 py-2 text-center text-sm text-subTextColor'
      )}
    >
      <div
        dangerouslySetInnerHTML={{ __html: `${isMe ? internalChatMessages.you : sender?.name} ${data.content}` }}
      ></div>
    </div>
  );
};

export default memo(MessageSystem);
