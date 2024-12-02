import { Space, Typography } from 'antd';
import { ChatGroupIcon } from 'assets';
import { Avatar, LoadingThreeDots } from 'components/common';
import { useProfile, useTimeAgo } from 'hooks';
import { internalChatMessages } from 'messages';
import { twMerge } from 'tailwind-merge';
import { ConversationDto, UserTypingDto } from 'types';
import { CONVERSATION_TYPE, MESSAGE_TYPE } from 'utils';

type ConversationItemProps = {
  conversation: ConversationDto;
  onSelect?: (value: ConversationDto) => void;
  userTyping?: UserTypingDto[];
  active?: boolean;
};
const ConversationItem: React.FC<ConversationItemProps> = ({ userTyping, onSelect, conversation, active }) => {
  const { profile } = useProfile();
  const elapsedMessageTime = useTimeAgo(conversation.lastMessage?.sentAt);
  const lastMessage = conversation?.lastMessage;
  const lastSender = lastMessage
    ? conversation?.participants.find((participant) => participant.userId === lastMessage.senderId)
    : undefined;
  const isMe = profile?.userId === lastMessage?.senderId;
  const isGroup = conversation.type === CONVERSATION_TYPE.GROUP;

  const renderMessage = () => {
    switch (lastMessage?.type) {
      case MESSAGE_TYPE.SYSTEM:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: `${lastMessage?.content?.replace(/<br\s*\/?>/gi, ' ') ?? ''}`
            }}
            className='mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-colorTextSecondary'
          ></div>
        );
      case MESSAGE_TYPE.TEXT:
      case MESSAGE_TYPE.STICKER:
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: `${lastMessage?.content?.replace(/<br\s*\/?>/gi, ' ') ?? ''}`
            }}
            className='mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-colorTextSecondary'
          ></div>
        );
      case MESSAGE_TYPE.IMAGE:
        if (lastMessage.content) {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: `${lastMessage?.content?.replace(/<br\s*\/?>/gi, ' ') ?? ''}`
              }}
              className='mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-colorTextSecondary'
            ></div>
          );
        }
        return (
          <Typography.Text ellipsis type='secondary' className='text-sm'>
            {internalChatMessages.sentImage}
          </Typography.Text>
        );
      case MESSAGE_TYPE.FILE:
        return (
          <Typography.Text ellipsis type='secondary' className='text-sm'>
            {internalChatMessages.sentFile}
          </Typography.Text>
        );
    }
  };

  const unreadCount = conversation?.participants.find(
    (participant) => participant.userId === profile?.userId
  )?.unreadCount;

  const userType =
    userTyping?.length && userTyping.length > 0
      ? conversation.participants.find((participant) => participant.userId === userTyping[0].userId)
      : null;

  return (
    <div
      id={`conversation-${conversation.conversationId}`}
      key={conversation.conversationId}
      className={twMerge(
        'flex h-[68px] cursor-pointer items-center px-4 py-0 hover:bg-colorBgIconHover',
        active && 'item-active bg-mainColor1 text-white hover:bg-mainColor1 hover:opacity-90'
      )}
      onClick={() => onSelect?.(conversation)}
    >
      <Avatar key={conversation.conversationId} size={52} fileId={conversation.image} name={conversation.name} />
      <div className='ml-3 flex flex-1 flex-col gap-2'>
        <Space size={0} direction='horizontal' className='flex items-center justify-between'>
          <Space size={8}>
            {isGroup && <ChatGroupIcon />}
            <Typography.Text ellipsis className='max-w-[220px] text-sm font-semibold'>
              {conversation.name}
            </Typography.Text>
          </Space>

          <Typography.Text className='whitespace-nowrap text-xs' type='secondary'>
            {elapsedMessageTime.replace('trước', '')}
          </Typography.Text>
        </Space>

        <Space size={0} direction='horizontal' className='flex items-center justify-between'>
          {userTyping?.length && userTyping?.length > 0 ? (
            <div className='flex max-w-[272px] gap-[2px]'>
              <Typography.Text type='secondary' ellipsis className='whitespace-nowrap text-sm'>
                {userTyping?.length > 1 ? userTyping.length : userType?.name}{' '}
                {internalChatMessages.isTyping.toLowerCase()}
                <LoadingThreeDots className='ml-1' />
              </Typography.Text>
            </div>
          ) : (
            <div className='flex max-w-[272px] gap-[2px]'>
              {isGroup ? (
                <Typography.Text className='whitespace-nowrap text-sm'>
                  {isMe ? internalChatMessages.you : lastSender?.name}:
                </Typography.Text>
              ) : null}
              {renderMessage()}
            </div>
          )}
          {unreadCount && unreadCount > 0 ? <div className='h-2 w-2 rounded-full bg-[#FF2D54]'></div> : null}
        </Space>
      </div>
    </div>
  );
};
export default ConversationItem;
