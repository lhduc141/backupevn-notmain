import { Button, Col, Typography } from 'antd';
import { rolesMessages } from 'messages';
import { RoleDto } from 'types';

export type RoleItemProps = {
  data: RoleDto;
  onClick?: (value: RoleDto) => void;
};
const RoleItem = ({ data, onClick }: RoleItemProps) => {
  return (
    <div className='flex w-full items-start justify-between gap-x-[154px]'>
      <Col span={6}>
        <Typography.Paragraph className='mb-1 font-semibold'>{data.name}</Typography.Paragraph>
        <Typography.Paragraph type='secondary' className='mb-0 text-sm'>
          {data.description}
        </Typography.Paragraph>
      </Col>
      <Col flex='auto'>
        <Typography.Paragraph type='secondary' className='mb-1 text-xs font-semibold'>
          {rolesMessages.permissions.toUpperCase()}
        </Typography.Paragraph>
        <div className='flex w-full flex-wrap gap-x-6 gap-y-1'>
          {data.permissions?.map((permission) => (
            <Col key={permission.permissionId} span={7}>
              <Typography.Text className='text-sm'>{permission.name}</Typography.Text>
            </Col>
          ))}
        </div>
      </Col>
      <Col span={1} className='text-end'>
        <Button
          size='small'
          type='link'
          className='text-sm font-normal'
          onClick={() => {
            onClick?.(data);
          }}
        >
          {rolesMessages.edit}
        </Button>
      </Col>
    </div>
  );
};

export default RoleItem;
