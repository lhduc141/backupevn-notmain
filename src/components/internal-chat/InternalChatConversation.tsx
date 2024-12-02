import { Button, Space, Spin, Typography } from 'antd';
import { ChatGroupIcon, PlusIcon } from 'assets';
import { InternalChatInput } from 'components/internal-chat';
import { internalChatMessages } from 'messages';
import { joinConversation, leaveConversation, offLeaveGroupConversation, onLeaveGroupConversation } from 'services';
import { useEffect, useState } from 'react';
import { CONVERSATION_TYPE } from 'utils';
import InternalChatMessageBox from './InternalChatMessageBox';
import GroupConversationInfoModal from './GroupConversationInfoModal';
import AddParticipantsModal from './AddParticipantsModal';
import { useProfile } from 'hooks';
import { useChatContext } from 'contexts';

type InternalChatConversationProps = {
  conversationId: string;
  onClose?: () => void;
};

const InternalChatConversation: React.FC<InternalChatConversationProps> = ({ conversationId, onClose }) => {
  const { conversation } = useChatContext();

  const { profile } = useProfile();
  const [openInfo, setOpenInfo] = useState(false);
  const [openAddParticipants, setOpenAddParticipants] = useState(false);

  useEffect(() => {
    if (conversationId) {
      joinConversation({ conversationId });
    }
    return () => {
      leaveConversation({ conversationId });
    };
  }, [conversationId]);

  useEffect(() => {
    onLeaveGroupConversation((data) => {
      if (conversationId === data) {
        onClose?.();
      }
    });

    return () => {
      offLeaveGroupConversation();
    };
  }, [conversationId]);

  const isGroupAdmin = conversation?.adminId === profile?.userId;
  const participants = conversation?.participants.filter((p) => !p.deletedAt) || [];

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-14 items-center justify-between border-b bg-white px-4'>
        {conversation?.type === CONVERSATION_TYPE.GROUP ? (
          <Button type='text' className='-m-2 p-2' onClick={() => setOpenInfo(true)}>
            <div className='flex flex-col items-start gap-[2px]'>
              <Space size={8}>
                <ChatGroupIcon />
                <Typography.Title className='m-0 max-w-[calc(80vw-500px)] text-sm' ellipsis={{ rows: 1 }}>
                  {conversation?.name}
                </Typography.Title>
              </Space>
              <Typography.Text className='text-xs' type='secondary'>
                {participants.length} {internalChatMessages.participants}
              </Typography.Text>
            </div>
          </Button>
        ) : (
          <Typography.Text className='text-sm font-semibold'>{conversation?.name}</Typography.Text>
        )}
        {conversation?.type === CONVERSATION_TYPE.GROUP && isGroupAdmin && (
          <Button type='link' shape='circle' onClick={() => setOpenAddParticipants(true)}>
            <PlusIcon />
          </Button>
        )}
      </div>
      {conversation ? (
        <div className='flex h-[calc(80vh-100px)] flex-col'>
          <InternalChatMessageBox />
          <InternalChatInput />
        </div>
      ) : (
        <Spin spinning />
      )}
      {openInfo && (
        <GroupConversationInfoModal
          conversationId={conversationId}
          open={openInfo}
          onCancel={() => setOpenInfo(false)}
          onClose={() => {
            setOpenInfo(false);
            onClose?.();
          }}
        />
      )}
      <AddParticipantsModal
        conversationId={conversationId}
        open={openAddParticipants}
        onCancel={() => setOpenAddParticipants(false)}
        onClose={() => setOpenAddParticipants(false)}
      />
    </div>
  );
};

export default InternalChatConversation;
