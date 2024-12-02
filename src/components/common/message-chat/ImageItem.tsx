import { MenuProps } from 'antd';
import { CopyIcon, DownloadImageIcon } from 'assets';
import { File } from 'components/common';
import { internalChatMessages } from 'messages';
import { memo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileDto, MessageDto } from 'types';
import { fileServerDownload, MESSAGE_IMAGE_HEIGHT_LARGE, MESSAGE_REF_TYPE } from 'utils';
import MessageOptions, { MessageOptionsRef } from './MessageOptions';

type ImageItemProps = {
  fileId: number;
  onForwardMessage?: (message: MessageDto) => void;
  data: MessageDto;
  width?: number;
  height?: number;
  className?: string;
  fileClassName?: string;
  isGroup?: boolean;
};

const ImageItem: React.FC<ImageItemProps> = ({
  onForwardMessage,
  data,
  fileId,
  width = MESSAGE_IMAGE_HEIGHT_LARGE,
  height = MESSAGE_IMAGE_HEIGHT_LARGE,
  fileClassName,
  className,
  isGroup
}) => {
  const [file, setFile] = useState<FileDto>();
  const optionsRef = useRef<MessageOptionsRef>(null);

  const items: MenuProps['items'] = [
    {
      key: 'download-image',
      label: internalChatMessages.download,
      onClick: () => {
        if (file) {
          fileServerDownload(file);
        }
      },
      icon: <DownloadImageIcon />
    },
    ...(data?.content?.length > 0
      ? [
          {
            key: 'copy-link',
            label: internalChatMessages.copy,
            onClick: async () => {
              try {
                const copyText = data?.content;
                await navigator.clipboard.writeText(copyText);
              } catch (err) {
                console.error('Failed to copy text: ', err);
              }
            },
            icon: <CopyIcon />
          }
        ]
      : [])
  ];
  return (
    <div
      onContextMenu={(e) => {
        optionsRef.current?.open(e);
      }}
      className='relative overflow-hidden'
      style={{
        height,
        width
      }}
    >
      {data.content && !isGroup && (
        <img alt='chat-image' src={file?.url} className='absolute h-full w-full rounded-lg opacity-70 blur-xl' />
      )}
      <File.Server
        onDataFetched={(file) => {
          setFile(file);
        }}
        fileId={Number(fileId)}
        fileClassName={twMerge(!data.content && !isGroup ? 'rounded-lg' : 'rounded-md', fileClassName)}
        className={twMerge('h-full w-full border-0 p-0', !data.content && 'items-end', className)}
      />
      <MessageOptions onForwardMessage={onForwardMessage} ref={optionsRef} items={items} message={data} />
    </div>
  );
};

export default memo(ImageItem);
