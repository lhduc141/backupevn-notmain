import { Typography } from 'antd';
import { memo, useState } from 'react';
import { FileDto, MessageDto } from 'types';
import { isArrayOfNumbers, MESSAGE_TYPE, stringToHslColor } from 'utils';
import { internalChatMessages } from 'messages';
import { twMerge } from 'tailwind-merge';
import { File } from '../files';
import { useChatContext } from 'contexts';

type MessageRepliedProps = {
  data: MessageDto;
  className?: string;
  isInChatInput?: boolean;
};

const MessageReplied: React.FC<MessageRepliedProps> = ({ data, className, isInChatInput }) => {
  const { conversation, scrollToMessageReplied } = useChatContext();

  const [file, setFile] = useState<FileDto>();
  const sender = conversation?.participants.find((participant) => participant.userId === data?.senderId);

  const color = stringToHslColor(sender?.name ?? 'reply-message', 80, 35);
  const bgcolor = stringToHslColor(sender?.name ?? 'reply-message', 80, 45, 1);

  const fileId = data.fileId
    ? typeof data.fileId === 'number'
      ? data.fileId
      : isArrayOfNumbers(data.fileId)
        ? data.fileId[0]
        : undefined
    : undefined;

  const renderMessage = () => {
    if (data.content) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: `${data?.content?.replace(/<br\s*\/?>/gi, ' ') ?? ''}`
          }}
          className='mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-colorTextSecondary'
        ></div>
      );
    }
    switch (data?.type) {
      case MESSAGE_TYPE.IMAGE:
        return (
          <Typography.Text ellipsis type='secondary' className='text-xs'>
            [{internalChatMessages.image}]
          </Typography.Text>
        );
      case MESSAGE_TYPE.FILE:
        if (file) {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: `${file?.originalName?.replace(/<br\s*\/?>/gi, ' ') ?? ''}`
              }}
              className='mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-colorTextSecondary'
            ></div>
          );
        }
        return (
          <Typography.Text ellipsis type='secondary' className='text-xs'>
            {internalChatMessages.sentFile}
          </Typography.Text>
        );
    }
  };
  return (
    <div
      onClick={() => scrollToMessageReplied(data, bgcolor)}
      className={twMerge(
        `relative flex h-[42px] w-full flex-1 cursor-pointer overflow-hidden overflow-y-hidden rounded-[3px]`,
        className
      )}
    >
      <div className='absolute h-full w-full opacity-10 hover:opacity-30' style={{ background: bgcolor }}></div>
      <div
        className='h-[42px] w-[4px] overflow-hidden'
        style={{
          backgroundColor: color
        }}
      ></div>
      <div className='ml-3 flex max-w-[calc(100%-20px)] flex-1 select-none items-center gap-1 py-[2px]'>
        {fileId ? (
          <File.Server
            onDataFetched={(file) => {
              setFile(file);
            }}
            showInfo={false}
            fileId={fileId}
            className='h-8 w-8 p-0'
          />
        ) : null}
        <div className='flex w-full max-w-full flex-col items-start text-left'>
          <Typography.Text
            ellipsis
            className='whitespace-nowrap text-xs font-semibold'
            style={{
              color: color
            }}
          >
            {isInChatInput && `${internalChatMessages.reply} `}
            {sender?.name}
          </Typography.Text>
          <div className='min-w-28 max-w-[calc(100%-48px)] text-xs'>{renderMessage()}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageReplied);
