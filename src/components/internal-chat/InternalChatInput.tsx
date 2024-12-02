import { ChatBox } from 'components/common';
import { useChatContext } from 'contexts';
import { useReplyInternalChatMessage } from 'hooks';
import { useEffect, useRef } from 'react';
import { typingInternalChat } from 'services';
import { FileUpload } from 'types';

type ChatBoxProps = {};

const InternalChatBox: React.FC<ChatBoxProps> = () => {
  const { conversation, onSentMessage } = useChatContext();
  const { conversationId } = conversation;
  const { messageReplied, handleRemoveReplyMessage } = useReplyInternalChatMessage();

  const isTyping = useRef<boolean>(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isTyping.current = false;
    return () => {
      changeTyping(false);
      handleRemoveReplyMessage();
    };
  }, []);

  const changeTyping = (isTyping: boolean) => {
    typingInternalChat({
      conversationId: conversationId,
      isTyping
    });
  };

  const handleInput = () => {
    if (!isTyping.current) {
      changeTyping(true);
      isTyping.current = true;
    }
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      changeTyping(false);
      isTyping.current = false;
    }, 2_000);
  };

  const handleSubmit = async (content: string, files: FileUpload[]) => {
    onSentMessage(content, files);
    changeTyping(false);
    isTyping.current = false;
  };

  return (
    <div className='bg-white transition-all'>
      <ChatBox
        conversation={conversation}
        onInput={handleInput}
        onSend={handleSubmit}
        messageReplied={messageReplied}
        removeReplyMessage={handleRemoveReplyMessage}
      />
    </div>
  );
};

export default InternalChatBox;
