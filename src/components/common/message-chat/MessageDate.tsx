import { Typography } from 'antd';
import dayjs from 'dayjs';
import { messages as translateMessages } from 'messages';
import { memo } from 'react';
import { DATE_TIME_FORMAT } from 'utils';

type MessageDateProps = {
  date: string | Date;
};

const MessageDate: React.FC<MessageDateProps> = ({ date }) => {
  return (
    <Typography.Paragraph className='mb-5 mt-4 text-xs text-subTextColor'>
      {dayjs(date).isSame(dayjs(), 'date') ? translateMessages.today : dayjs(date).format(DATE_TIME_FORMAT)}
    </Typography.Paragraph>
  );
};

export default memo(MessageDate);
