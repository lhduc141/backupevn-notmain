import { Avatar } from 'components/common';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConversationParticiPantDto, MessageDto } from 'types';
import { MESSAGE_TYPE } from 'utils';

type MessageSenderProps = {
  sender?: ConversationParticiPantDto;
  isLastOfSender?: boolean;
  isMe?: boolean;
  message?: MessageDto;
};

const MessageSender: React.FC<MessageSenderProps> = ({ message, sender, isLastOfSender, isMe }) => {
  if (message?.type !== MESSAGE_TYPE.SYSTEM)
    return (
      <>
        {sender && isLastOfSender && !isMe ? (
          <Avatar key={sender.image} size={32} fileId={sender.image} name={sender.name} />
        ) : isMe ? null : (
          <div className={twMerge('w-8')}></div>
        )}
      </>
    );
  return null;
};

export default memo(MessageSender);
