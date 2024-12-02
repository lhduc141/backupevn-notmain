import { Typography } from 'antd';
import { LoadingThreeDots } from 'components/common';
import { useChatContext } from 'contexts';
import { internalChatMessages } from 'messages';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { onInternalChatTyping } from 'services';
import { selectUserProfile } from 'store/features';
import { ConversationParticiPantDto } from 'types';

type InternalChatUserTypingProps = {};

const InternalChatUserTyping: React.FC<InternalChatUserTypingProps> = () => {
  const { conversation } = useChatContext();
  const { participants } = conversation;
  const [userTyping, setUserTyping] = useState<ConversationParticiPantDto[]>([]);
  const profile = useSelector(selectUserProfile);

  useEffect(() => {
    onInternalChatTyping((data) => {
      if (profile?.userId === data.userId || data.conversationId !== conversation.conversationId) return;
      if (data.isTyping) {
        const user = participants.find((participant) => participant.userId === data.userId);
        if (user) {
          setUserTyping((prev) => [...(prev?.filter((o) => o.userId !== data.userId) || []), user]);
        }
      } else {
        setUserTyping((prev) => prev?.filter((o) => o.userId !== data.userId) || []);
      }
    });
  }, []);

  return (
    <div className='relative'>
      {userTyping.length > 0 && (
        <Typography.Text className='flex h-6 items-center rounded-sm bg-white px-4 text-xs italic'>
          {userTyping.map((o) => o.name).join(', ')} {internalChatMessages.isTyping.toLowerCase()}
          <LoadingThreeDots className='ml-1' />
        </Typography.Text>
      )}
    </div>
  );
};

export default InternalChatUserTyping;
