import { InfoOutlinedIcon } from 'assets';
import {
  MessageDate,
  MessageFile,
  MessageFileList,
  MessageImage,
  MessageImageList,
  MessageSender,
  MessageSystem,
  MessageText
} from 'components/common';
import { useProfile } from 'hooks';
import { memo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConversationParticiPantDto, MessageDto } from 'types';
import { MESSAGE_TYPE } from 'utils';
import InternalChatForwardMessageModal from './InternalChatForwardMessageModal';

type InternalChatMessageItemProps = {
  data: MessageDto;
  showDate: boolean;
  sender?: ConversationParticiPantDto;
  isGroup?: boolean;
  isLastOfSender?: boolean;
  isFirstOfSender?: boolean;
};

const InternalChatMessageItem: React.FC<InternalChatMessageItemProps> = ({
  data,
  showDate,
  sender,
  isGroup,
  isFirstOfSender,
  isLastOfSender
}) => {
  const [openForward, setOpenForward] = useState(false);

  const { profile } = useProfile();
  const isMe = data.senderId === profile?.userId;
  const renderMessage = () => {
    switch (data.type) {
      case MESSAGE_TYPE.SYSTEM:
        return <MessageSystem data={data} sender={sender} />;
      case MESSAGE_TYPE.TEXT:
      case MESSAGE_TYPE.STICKER:
        return (
          <MessageText
            onForwardMessage={() => setOpenForward(true)}
            data={data}
            isFirstOfSender={isFirstOfSender}
            isGroup={isGroup}
            sender={sender}
          />
        );
      case MESSAGE_TYPE.IMAGE:
        if (typeof data.fileId === 'number') {
          return (
            <MessageImage
              onForwardMessage={() => setOpenForward(true)}
              data={data}
              fileId={data.fileId}
              sentAt={data.sentAt}
            />
          );
        } else if (Array.isArray(data.fileId)) {
          return <MessageImageList onForwardMessage={() => setOpenForward(true)} data={data} />;
        }
        return (
          <div className='flex h-[190px] w-[190px] items-center justify-center rounded-lg bg-gray-500'>
            <InfoOutlinedIcon className='h-10 w-10 text-colorError' />
          </div>
        );
      case MESSAGE_TYPE.FILE:
        if (typeof data.fileId === 'number')
          return <MessageFile onForwardMessage={() => setOpenForward(true)} data={data} fileId={data.fileId} />;
        else if (Array.isArray(data.fileId)) {
          return <MessageFileList onForwardMessage={() => setOpenForward(true)} data={data} />;
        }
    }
  };

  return (
    <>
      <div className='relative w-full text-center'>
        {showDate && data.sentAt && <MessageDate date={data.sentAt} />}

        <div
          className={twMerge(
            'flex items-end gap-2',
            isMe ? 'flex-row-reverse' : '',
            data.type === MESSAGE_TYPE.SYSTEM ? 'justify-center' : ''
          )}
        >
          <MessageSender message={data} sender={sender} isMe={isMe} isLastOfSender={isLastOfSender} />
          {renderMessage()}
        </div>
      </div>
      <InternalChatForwardMessageModal
        message={data}
        open={openForward}
        onCancel={() => {
          setOpenForward(false);
        }}
      />
    </>
  );
};

export default memo(InternalChatMessageItem);
