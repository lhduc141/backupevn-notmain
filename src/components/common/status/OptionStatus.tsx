import { Typography } from 'antd';
import { OptionCompactDto } from 'types';

type OptionStatusProps = {
  value: OptionCompactDto;
};

const OptionStatus = ({ value }: OptionStatusProps) => {
  const render = () => {
    switch (value.code) {
      case 'ACTIVE':
        return (
          <div className='flex items-center gap-2'>
            <Typography.Text className='text-colorBgSuccess'>•</Typography.Text>
            <Typography.Text className='text-sm'>{value.name}</Typography.Text>
          </div>
        );
      case 'INACTIVE':
        return (
          <div className='flex items-center gap-2'>
            <Typography.Text className='text-colorError'>•</Typography.Text>
            <Typography.Text className='text-sm'>{value.name}</Typography.Text>
          </div>
        );
      case 'WAITING_APPROVE':
        return (
          <div className='flex items-center gap-2'>
            <Typography.Text className='text-secondaryColor2'>•</Typography.Text>
            <Typography.Text className='text-sm'>{value.name}</Typography.Text>
          </div>
        );
    }
  };
  return <>{render()}</>;
};

export default OptionStatus;
