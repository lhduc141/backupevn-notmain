import { Typography } from 'antd';
import { MessageReplied, MessageText } from 'components/common';
import dayjs from 'dayjs';
import { useProfile } from 'hooks';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { MessageDto } from 'types';
import { MESSAGE_IMAGE_HEIGHT, MESSAGE_IMAGE_HEIGHT_MEDIUM, MESSAGE_REF_TYPE, TIME_FORMAT } from 'utils';
import { splitImageList } from 'utils/chat/calculateMessageImageList';
import ImageItem from './ImageItem';

type MessageImageListProps = {
  data: MessageDto;
  onForwardMessage?: (message: MessageDto) => void;
};

const MessageImageList: React.FC<MessageImageListProps> = ({ data, onForwardMessage }) => {
  const { profile } = useProfile();
  const images = data.fileId as number[];
  const isMe = data.senderId === profile?.userId;
  const isReply = Boolean(data.refType === MESSAGE_REF_TYPE.REPLY && data.refMessage);

  const splitImages = splitImageList(images);
  const firstArr = splitImages[0] ?? [];
  const secondArr = splitImages[1] ?? [];
  const thirdArr = splitImages[2] ?? [];
  const groups = [];
  for (let i = 0; i < secondArr.length; i += 3) {
    groups.push(secondArr.slice(i, i + 3));
  }

  return (
    <div className={twMerge('relative flex w-full text-center', isMe ? 'flex-row-reverse' : '')}>
      <div
        className={twMerge(
          'relative flex w-fit flex-col overflow-hidden rounded-lg',
          isMe ? 'bg-colorBgMyMessage' : 'bg-colorBgMessage'
        )}
      >
        {isReply && (
          <div className='p-2'>
            <MessageReplied data={data.refMessage!} />
          </div>
        )}
        <div
          className={twMerge(
            'flex w-fit flex-col gap-[2px] p-[2px]',
            isMe ? 'bg-colorBgMyMessage' : 'bg-colorBgMessage',
            data.content ? 'rounded-b-none' : ''
          )}
        >
          {firstArr.length > 0 && (
            <div className='grid grid-cols-2 gap-[2px]'>
              {firstArr.map((image, index) => (
                <ImageItem
                  key={image}
                  height={MESSAGE_IMAGE_HEIGHT_MEDIUM}
                  width={MESSAGE_IMAGE_HEIGHT_MEDIUM}
                  onForwardMessage={onForwardMessage}
                  data={data}
                  fileId={Number(image)}
                  fileClassName='object-cover w-full'
                  isGroup
                  className='h-full w-full items-center border-none p-0'
                />
              ))}
            </div>
          )}
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className='grid grid-cols-3 gap-[2px]'>
              {group.map((image, index) => (
                <ImageItem
                  key={image}
                  height={MESSAGE_IMAGE_HEIGHT}
                  width={MESSAGE_IMAGE_HEIGHT}
                  onForwardMessage={onForwardMessage}
                  data={data}
                  fileId={Number(image)}
                  fileClassName='object-cover w-full'
                  isGroup
                  className='h-full w-full items-center border-none p-0'
                />
              ))}
            </div>
          ))}
          {thirdArr.length > 0 && (
            <div className='grid grid-cols-2 gap-[2px]'>
              {thirdArr.map((image, index) => (
                <ImageItem
                  key={image}
                  height={MESSAGE_IMAGE_HEIGHT_MEDIUM}
                  width={MESSAGE_IMAGE_HEIGHT_MEDIUM}
                  onForwardMessage={onForwardMessage}
                  data={data}
                  fileId={Number(image)}
                  fileClassName='object-cover w-full'
                  isGroup
                  className='h-full w-full items-center border-none p-0'
                />
              ))}
            </div>
          )}
        </div>
        {data.content?.length && data.content?.length > 0 ? (
          <div>
            <MessageText className='max-w-[386px] rounded-t-none' isImageMessage data={data} />
          </div>
        ) : (
          <div className='absolute bottom-1 left-1 rounded-2xl bg-textHoverBg px-1'>
            <Typography.Paragraph className='mb-0 text-xs' type='secondary'>
              {dayjs(data.sentAt).format(TIME_FORMAT)}
            </Typography.Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MessageImageList);
