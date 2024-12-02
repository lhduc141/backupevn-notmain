import { Typography } from 'antd';
import { MessageFile, MessageReplied } from 'components/common';
import dayjs from 'dayjs';
import { useProfile } from 'hooks';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { MessageDto } from 'types';
import { MESSAGE_REF_TYPE, TIME_FORMAT } from 'utils';

type MessageFileListProps = {
  data: MessageDto;
  onForwardMessage?: (message: MessageDto) => void;
};

const MessageFileList: React.FC<MessageFileListProps> = ({ data, onForwardMessage }) => {
  const { profile } = useProfile();
  const files = data.fileId as number[];
  const isMe = data.senderId === profile?.userId;
  const isReply = Boolean(data.refType === MESSAGE_REF_TYPE.REPLY && data.refMessage);

  return (
    <div className={twMerge('relative flex w-full text-center', isMe ? 'flex-row-reverse' : '')}>
      <div
        className={twMerge(
          'relative flex w-auto min-w-[100px] max-w-[320px] flex-col gap-[2px] overflow-hidden rounded-lg',
          isMe ? 'bg-colorBgMyMessage' : 'bg-colorBgMessage'
        )}
      >
        {isReply && (
          <div className='mt-2 px-2'>
            <MessageReplied data={data.refMessage!} />
          </div>
        )}
        {files.map((file) => (
          <MessageFile
            isList
            showReply={false}
            data={data}
            fileId={file}
            key={file}
            onForwardMessage={onForwardMessage}
          />
        ))}
        <div className='absolute bottom-1 left-1 rounded-2xl bg-textHoverBg px-1'>
          <Typography.Paragraph className='mb-0 text-xs' type='secondary'>
            {dayjs(data.sentAt).format(TIME_FORMAT)}
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageFileList);
