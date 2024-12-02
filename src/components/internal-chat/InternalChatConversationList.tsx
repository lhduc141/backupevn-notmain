import { Button, Spin, Typography } from 'antd';
import { AddChatIcon, AddGroupIcon } from 'assets';
import { ConversationItem } from 'components/common';
import { useLazyConversations, useProfile } from 'hooks';
import { internalChatMessages } from 'messages';
import { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { offInternalChatTyping, onInternalChatTyping } from 'services';
import { ConversationDto, UserTypingDto } from 'types';
import InternalChatGroupModalCreate from './InternalChatGroupModalCreate';
import InternalChatPrivateModal from './InternalChatPrivateModal';

type InternalChatConversationListProps = {
  onSelectConversation: (value?: ConversationDto) => void;
  selectedConversationId?: string;
};

const InternalChatConversationList: React.FC<InternalChatConversationListProps> = ({
  onSelectConversation,
  selectedConversationId
}) => {
  const { profile } = useProfile();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [privateOpen, setPrivateOpen] = useState(false);
  const [groupIsTyping, setGroupIsTyping] = useState<UserTypingDto[]>([]);
  const {
    data: conversations,
    fetchData: fetchConversations,
    isLoading,
    isFetching,
    hasMore,
    handleLoadMore
  } = useLazyConversations();

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    onInternalChatTyping((data) => {
      if (data.userId === profile?.userId) return;
      if (data.isTyping) {
        setGroupIsTyping((prev) => [
          ...prev?.filter((o) => o.conversationId !== data.conversationId && o.userId !== data.userId),
          data
        ]);
      } else {
        setGroupIsTyping((prev) => [
          ...prev?.filter((o) => o.conversationId !== data.conversationId && o.userId !== data.userId)
        ]);
      }
    });

    return () => {
      offInternalChatTyping();
    };
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='flex h-14 items-center pl-4 pr-[10px]'>
        <Typography.Text className='mb-0 text-lg font-semibold'>{internalChatMessages.internalChat}</Typography.Text>
        <Button
          className='ml-auto'
          shape='circle'
          type='text'
          icon={<AddGroupIcon className='text-colorPrimary' />}
          onClick={() => setOpenCreateModal(true)}
        />
        <Button
          shape='circle'
          type='text'
          icon={<AddChatIcon className='text-colorPrimary' />}
          onClick={() => setPrivateOpen(true)}
        />
      </div>

      <Spin spinning={isLoading}>
        <div className='h-[calc(80vh-100px)] max-h-[calc(80vh-100px)] w-[400px] overflow-y-auto overflow-x-hidden'>
          {conversations.map((item: ConversationDto) => (
            <ConversationItem
              active={selectedConversationId === item.conversationId}
              key={item.conversationId}
              conversation={item}
              onSelect={onSelectConversation}
              userTyping={groupIsTyping.filter((o) => o.conversationId === item.conversationId)}
            />
          ))}
          {!isLoading && hasMore && !isFetching ? (
            <InView className='h-0 w-full' as='div' onChange={(inView) => inView && handleLoadMore()} />
          ) : null}
        </div>
      </Spin>

      <InternalChatPrivateModal
        open={privateOpen}
        onCancel={() => setPrivateOpen(false)}
        onSelect={(data) => {
          onSelectConversation(data);
          setPrivateOpen(false);
        }}
      />
      <InternalChatGroupModalCreate
        onCreateSuccess={(data) => {
          onSelectConversation(data);
        }}
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
      />
    </div>
  );
};

export default InternalChatConversationList;
