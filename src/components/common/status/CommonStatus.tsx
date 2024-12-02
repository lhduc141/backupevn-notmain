import { Typography } from 'antd';
import { messages } from 'messages';
import { twMerge } from 'tailwind-merge';

type CommonStatusProps = {
  value: boolean;
  textClassname?: string;
};

const CommonStatus = ({ value, textClassname }: CommonStatusProps) => {
  const render = () => {
    switch (value) {
      case true:
        return (
          <div className='flex items-center gap-2'>
            <Typography.Text className='text-colorBgSuccess'>•</Typography.Text>
            <Typography.Text className={twMerge('text-sm', textClassname)}>
              {messages.statusEnum.active}
            </Typography.Text>
          </div>
        );
      case false:
        return (
          <div className='flex items-center gap-2'>
            <Typography.Text className='text-colorError'>•</Typography.Text>
            <Typography.Text className={twMerge('text-sm', textClassname)}>
              {messages.statusEnum.inactive}
            </Typography.Text>
          </div>
        );
    }
  };
  return <>{render()}</>;
};

export default CommonStatus;
