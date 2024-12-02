import { Button } from 'antd';
import { CloseIcon, ReplyIcon } from 'assets';
import React from 'react';
import { ConversationDto, MessageDto } from 'types';
import { stringToHslColor } from 'utils';
import { MessageReplied } from '../message-chat';
import { twMerge } from 'tailwind-merge';

type ChatReplyMessageProps = {
  message?: MessageDto;
  conversation: ConversationDto;
  removeReplyMessage?: () => void;
};

const ChatReplyMessage: React.FC<ChatReplyMessageProps> = ({ message, conversation, removeReplyMessage }) => {
  const sender = conversation?.participants.find((participant) => participant.userId === message?.senderId);
  const color = stringToHslColor(sender?.name ?? 'reply-message', 80, 35);

  return (
    <>
      <div
        className={twMerge(
          'flex h-0 items-center',
          message && message.conversationId === conversation.conversationId && 'h-12 px-[10px] pt-[6px]'
        )}
        style={{
          transition: 'height 0.175s  ease-in-out'
        }}
      >
        {message && message.conversationId === conversation.conversationId && (
          <>
            <div
              className='flex h-8 w-8 items-center justify-center'
              style={{
                color: color
              }}
            >
              <ReplyIcon />
            </div>
            <MessageReplied isInChatInput className='ml-[10px] mr-4' data={message} />
            <Button
              type='text'
              className='h-8 w-8'
              shape='circle'
              icon={<CloseIcon className='text-colorPrimary' />}
              onClick={removeReplyMessage}
            ></Button>
          </>
        )}
      </div>
    </>
  );
};

export default ChatReplyMessage;
