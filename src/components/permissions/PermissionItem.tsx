import { Col, Typography, List, Tag, Button } from 'antd';
import { Avatar } from 'components/common';
import { permissionsMessages } from 'messages';
import { memo } from 'react';
import { PermissionDto } from 'types';

type PermissionItemProps = {
  data: PermissionDto;
  onClick?: (value: PermissionDto) => void;
};

const PermissionItem = ({ data, onClick }: PermissionItemProps) => {
  return (
    <div className='flex w-full items-start justify-between'>
      <Col span={4}>
        <Typography.Paragraph className='mb-1 font-semibold'>{data.name}</Typography.Paragraph>
        <Typography.Paragraph type='secondary' className='mb-0 text-sm'>
          {data.description}
        </Typography.Paragraph>
      </Col>
      <Col span={4}>
        <Typography.Paragraph type='secondary' className='mb-1 text-xs font-semibold'>
          {permissionsMessages.group.toUpperCase()}
        </Typography.Paragraph>
        {data.userGroups && data.userGroups.length > 0 && (
          <List
            dataSource={data.userGroups}
            rowKey={(item) => item.userGroupId}
            renderItem={(item) => (
              <List.Item className='border-0 p-0 pb-1'>
                <Typography.Text className='text-sm'>{item.name}</Typography.Text>
              </List.Item>
            )}
          />
        )}
      </Col>
      <Col span={4}>
        <Typography.Paragraph type='secondary' className='mb-1 text-xs font-semibold'>
          {permissionsMessages.user.toUpperCase()}
        </Typography.Paragraph>
        {data.users && data.users.length > 0 && (
          <List
            dataSource={data.users}
            rowKey={(item) => item.userId}
            renderItem={(item) => (
              <List.Item className='justify-start gap-x-2 border-none p-0 pb-1'>
                <Avatar size={16} fileId={item.avatar} name={item.fullName} />
                <Typography.Text className='text-sm'>{item.fullName}</Typography.Text>
              </List.Item>
            )}
          />
        )}
      </Col>
      <Col span={4}>
        <Typography.Paragraph type='secondary' className='mb-1 text-xs font-semibold'>
          {permissionsMessages.scope.toUpperCase()}
        </Typography.Paragraph>
        {data.isApplyAll && (
          <Typography.Text type='secondary' className='text-sm'>
            {permissionsMessages.allOrganizationUnits}
          </Typography.Text>
        )}
        {!data.isApplyAll && data.organizationUnits && data.organizationUnits.length > 0 && (
          <List
            split={false}
            dataSource={data.organizationUnits}
            rowKey={(item) => item.organizationUnitId}
            renderItem={(item) => (
              <Tag className='bg-backgroundColor4 me-1 rounded-2xl border-0 text-xs text-colorTextBase'>
                {item.name}
              </Tag>
            )}
          />
        )}
      </Col>
      <Col span={4} className='text-end'>
        <Button
          size='small'
          type='link'
          className='text-sm font-normal'
          onClick={() => {
            onClick?.(data);
          }}
        >
          {permissionsMessages.updateScope}
        </Button>
      </Col>
    </div>
  );
};

export default memo(PermissionItem);
