import { MenuProps, Typography } from 'antd';
import { DownloadImageIcon } from 'assets';
import { File, MessageReplied, MessageText } from 'components/common';
import dayjs from 'dayjs';
import { useProfile } from 'hooks';
import { internalChatMessages } from 'messages';
import { memo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileDto, MessageDto } from 'types';
import { fileServerDownload, MESSAGE_IMAGE_HEIGHT_LARGE, MESSAGE_REF_TYPE, TIME_FORMAT } from 'utils';
import MessageOptions, { MessageOptionsRef } from './MessageOptions';

type MessageImageProps = {
  fileId: number;
  sentAt?: string | Date;
  onForwardMessage?: (message: MessageDto) => void;
  data: MessageDto;
};

const MessageImage: React.FC<MessageImageProps> = ({ onForwardMessage, data, fileId, sentAt }) => {
  const { profile } = useProfile();

  const [file, setFile] = useState<FileDto>();
  const optionsRef = useRef<MessageOptionsRef>(null);

  const isMe = data.senderId === profile?.userId;
  const isReply = Boolean(data.refType === MESSAGE_REF_TYPE.REPLY && data.refMessage);
  const isHasContent = Boolean(data.content || isReply);

  const items: MenuProps['items'] = [
    {
      key: 'copy',
      label: internalChatMessages.download,
      onClick: () => {
        if (file) {
          fileServerDownload(file);
        }
      },
      icon: <DownloadImageIcon />
    }
  ];

  return (
    <div
      onContextMenu={(e) => {
        optionsRef.current?.open(e);
      }}
      className='relative'
    >
      <div
        className={twMerge(
          'overflow-hidden rounded-lg',
          isMe ? 'border-colorBgMyMessage bg-colorBgMyMessage' : 'border-colorBgMessage bg-colorBgMessage',
          isHasContent ? 'border' : 'border-0 bg-transparent',
          data.content && 'rounded-b-none'
        )}
      >
        {isReply && (
          <div className='p-2'>
            <MessageReplied data={data.refMessage!} />
          </div>
        )}
        <div
          className='relative overflow-hidden'
          style={{
            height: MESSAGE_IMAGE_HEIGHT_LARGE,
            width: isHasContent ? MESSAGE_IMAGE_HEIGHT_LARGE : 'fit-content',
            maxWidth: MESSAGE_IMAGE_HEIGHT_LARGE
          }}
        >
          {isHasContent && (
            <img
              alt='message-file-content'
              src={file?.url}
              className='absolute h-full w-full rounded-lg opacity-70 blur-xl'
            />
          )}
          <File.Server
            onDataFetched={(file) => {
              setFile(file);
            }}
            fileId={Number(fileId)}
            fileClassName={twMerge(isHasContent ? 'rounded-md' : 'rounded-lg')}
            className={twMerge(
              'h-full w-full items-center border-0 p-0',
              isHasContent ? 'items-center' : isMe ? 'items-end' : 'items-start'
            )}
          />
        </div>
      </div>
      {data.content?.length && data.content?.length > 0 ? (
        <div>
          <MessageText isImageMessage data={data} className='max-w-[362px] rounded-t-none' />
        </div>
      ) : (
        <div className={twMerge('absolute bottom-1 left-1 rounded-2xl bg-textHoverBg px-1')}>
          <Typography.Paragraph className='mb-0 text-xs' type='secondary'>
            {dayjs(sentAt).format(TIME_FORMAT)}
          </Typography.Paragraph>
        </div>
      )}
      <MessageOptions onForwardMessage={onForwardMessage} ref={optionsRef} items={items} message={data} />
    </div>
  );
};

export default memo(MessageImage);
