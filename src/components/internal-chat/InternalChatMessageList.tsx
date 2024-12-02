import { memo } from 'react';
import { MessageDto } from 'types';
import { CONVERSATION_TYPE, getPropsMessageItem } from 'utils';
import InternalChatMessageItem from './InternalChatMessageItem';
import { useChatContext } from 'contexts';

type InternalChatMessageListProps = {
  messages: MessageDto[];
};
export type InternalChatInternalChatMessageListRefProps = {};
const MessageList: React.FC<InternalChatMessageListProps> = ({ messages }) => {
  const { displayIndex, positions, conversation } = useChatContext();
  const { start, end } = displayIndex;
  return (
    <>
      {messages.map((message: MessageDto, index: number) => {
        if (index >= start && index <= end) {
          const { isFirstOfSender, isLastOfSender, isOnSameDate } = getPropsMessageItem(
            message,
            messages[index + 1],
            messages[index - 1]
          );

          return (
            <div
              id={`message-${message.messageId}-${index}`}
              key={`message-${message.messageId}`}
              className='w-[calc(100%-32px)]'
              style={{
                position: 'absolute',
                top: positions[index]?.position ?? -9999,
                height: positions[index]?.height ?? -9999,
                zIndex: 1,
                paddingTop: 4
              }}
            >
              <InternalChatMessageItem
                isGroup={conversation?.type === CONVERSATION_TYPE.GROUP}
                sender={conversation.participants.find((participant) => participant.userId === message.senderId)}
                key={message.messageId}
                showDate={!isOnSameDate}
                isFirstOfSender={isFirstOfSender}
                isLastOfSender={isLastOfSender}
                data={message}
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

const InternalChatMessageList = memo(MessageList);
export default InternalChatMessageList;
