import { Typography } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Metadata } from 'types';

type MessageUrlProps = {
  data: Metadata;
};

const MessageUrl: React.FC<MessageUrlProps> = ({ data }) => {
  return (
    <Link
      to={data.url ?? ''}
      target='_blank'
      className='mt-2 flex select-none flex-col gap-2 rounded-lg'
      style={{
        width: 312
      }}
    >
      <div className='h-[160px] w-[312px]'>
        <img src={data.image} alt='message-image' className={twMerge('h-full w-full rounded-lg object-cover')} />
      </div>
      <div>
        <div className='mb-2 text-sm font-semibold' dangerouslySetInnerHTML={{ __html: data.title ?? '' }}></div>
        <div
          className='text-sm text-colorTextSecondary'
          dangerouslySetInnerHTML={{ __html: data.description ?? '' }}
        ></div>
        <Typography.Text className='text-sm font-semibold text-colorPrimary' ellipsis>
          {data.appName}
        </Typography.Text>
      </div>
    </Link>
  );
};

export default memo(MessageUrl);
