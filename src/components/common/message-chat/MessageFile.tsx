import { MenuProps, Typography } from 'antd';
import { DownloadFileIcon } from 'assets';
import { File, MessageOptions, MessageReplied } from 'components/common';
import dayjs from 'dayjs';
import { internalChatMessages } from 'messages';
import { memo, useRef, useState } from 'react';
import { FileDto, MessageDto } from 'types';
import { fileServerDownload, MESSAGE_FILE_HEIGHT, MESSAGE_REF_TYPE, TIME_FORMAT } from 'utils';
import { MessageOptionsRef } from './MessageOptions';
import { twMerge } from 'tailwind-merge';
import { useProfile } from 'hooks';

type MessageFileProps = {
  fileId: number;
  onForwardMessage?: (message: MessageDto) => void;
  data: MessageDto;
  showReply?: boolean;
  isList?: boolean;
};

const MessageFile: React.FC<MessageFileProps> = ({ onForwardMessage, data, fileId, showReply = true, isList }) => {
  const { profile } = useProfile();

  const [file, setFile] = useState<FileDto>();
  const optionsRef = useRef<MessageOptionsRef>(null);

  const isMe = data.senderId === profile?.userId;
  const isReply = Boolean(data.refType === MESSAGE_REF_TYPE.REPLY && data.refMessage);

  const items: MenuProps['items'] = [
    {
      key: 'download',
      label: internalChatMessages.download,
      onClick: () => {
        if (file) {
          fileServerDownload(file);
        }
      },
      icon: <DownloadFileIcon />
    }
  ];
  return (
    <div className='relative'>
      <div
        onContextMenu={(e) => {
          optionsRef.current?.open(e);
        }}
        className={twMerge(
          'relative w-auto min-w-[140px] max-w-[320px] cursor-pointer rounded-lg px-3',
          isMe ? 'bg-colorBgMyMessage' : 'bg-colorBgMessage'
        )}
      >
        {isReply && showReply && (
          <div className='pt-2'>
            <MessageReplied data={data.refMessage!} />
          </div>
        )}
        <div
          onClick={() => {
            if (file) {
              fileServerDownload(file);
            }
          }}
          className='flex items-center'
          style={{
            height: MESSAGE_FILE_HEIGHT
          }}
        >
          <File.Server
            onDataFetched={(file) => {
              setFile(file);
            }}
            fileId={Number(fileId)}
            iconSize={42}
            className='h-full w-full border-0 p-0'
          />
        </div>
        {!isList && (
          <div className='absolute bottom-1 left-1 rounded-2xl bg-textHoverBg px-1'>
            <Typography.Paragraph className='mb-0 text-xs' type='secondary'>
              {dayjs(data.sentAt).format(TIME_FORMAT)}
            </Typography.Paragraph>
          </div>
        )}
      </div>
      <MessageOptions onForwardMessage={onForwardMessage} ref={optionsRef} items={items} message={data} />
    </div>
  );
};

export default memo(MessageFile);
