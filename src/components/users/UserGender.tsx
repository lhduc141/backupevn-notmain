import { Typography } from 'antd';
import { FemaleColorIcon, MaleColorIcon } from 'assets';
import { OptionCompactDto } from 'types';
import { USER_GENDER } from 'utils';

type userGenderProps = {
  value: OptionCompactDto;
};

const UserGender = ({ value }: userGenderProps) => {
  const renderIcon = () => {
    switch (value.optionId) {
      case USER_GENDER.MALE:
        return <MaleColorIcon />;
      case USER_GENDER.FEMALE:
        return <FemaleColorIcon />;
      default:
        return null;
    }
  };
  return (
    <div className='flex items-center gap-2'>
      {renderIcon()}
      <Typography.Text className='text-sm'>{value.name}</Typography.Text>
    </div>
  );
};

export default UserGender;
