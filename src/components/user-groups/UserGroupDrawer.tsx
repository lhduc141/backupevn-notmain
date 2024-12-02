import { Button, Descriptions, Divider, DrawerProps, List, Typography } from 'antd';
import { useGetUserGroupDetailQuery } from 'services';
import { UserGroupDto } from 'types';
import { messages, userGroupsMessages } from 'messages';
import { useState } from 'react';
import { DEFAULT_LIST_INFO_SIZE } from 'utils';
import { Avatar, Drawer } from 'components/common';
import UserGroupActions from './UserGroupActions';
import UserGroupUserList from './UserGroupUserList';

type UserGroupDrawerProps = DrawerProps & {
  userGroupId?: number;
  onUpdateInfo?: (data: UserGroupDto) => void;
  onUpdateUsers?: (data: UserGroupDto) => void;
  onUpdatePermissions?: (data: UserGroupDto) => void;
};

const UserGroupDrawer = ({
  userGroupId,
  onUpdateUsers,
  onUpdateInfo,
  onUpdatePermissions,
  ...props
}: UserGroupDrawerProps) => {
  const { data, isLoading } = useGetUserGroupDetailQuery(userGroupId!, {
    skip: !userGroupId
  });

  const [showPermission, setShowPermission] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const userGroup = data?.data;

  const descriptionItem = [
    {
      key: 'name',
      label: userGroupsMessages.userGroupName,
      children: userGroup?.name
    },
    {
      key: 'organizationUnit',
      label: userGroupsMessages.organizationUnit,
      children: userGroup?.organizationUnit?.name
    }
  ];

  return (
    <Drawer
      {...props}
      loading={isLoading}
      width={454}
      title={userGroup?.code}
      extra={
        <div>
          {userGroup && (
            <UserGroupActions
              userGroup={userGroup}
              onUpdateInfo={onUpdateInfo}
              onUpdateUsers={onUpdateUsers}
              onUpdatePermissions={onUpdatePermissions}
            />
          )}
        </div>
      }
    >
      <Typography.Title className='mb-8 mt-0 text-2.5xl'>{userGroup?.name}</Typography.Title>

      <Typography.Title className='mb-4 mt-0 text-lg'>{messages.general}</Typography.Title>
      <Descriptions items={descriptionItem} column={1} labelStyle={{ minWidth: 140 }} />
      <Divider className='mb-8 mt-6' />

      <Typography.Title className='mb-4 mt-0 text-lg'>{userGroupsMessages.classify}</Typography.Title>
      <Typography.Text>{userGroup?.userGroupClassify?.name ?? '-'}</Typography.Text>
      <Divider className='mb-8 mt-6' />

      <Typography.Title className='mb-0 mt-0 pb-2 text-lg'>{userGroupsMessages.users}</Typography.Title>
      {showUser && userGroupId ? (
        <UserGroupUserList userGroupId={userGroupId} compact />
      ) : (
        <>
          {userGroup?.users && userGroup.users.length > 0 ? (
            <List
              split={false}
              dataSource={userGroup?.users}
              rowKey={(item) => item.userId}
              renderItem={(item) => (
                <List.Item className='py-2'>
                  <div className='flex items-center gap-x-4'>
                    <Avatar size={32} fileId={item.avatar} name={item.fullName} />
                    <div>
                      <Typography.Text>{item.fullName}</Typography.Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : undefined}
          {userGroup?.countUsers && userGroup.countUsers > DEFAULT_LIST_INFO_SIZE ? (
            <Button type='text' className='-mx-4 font-normal text-colorPrimary' onClick={() => setShowUser(true)}>
              {messages.viewAll(`${userGroup.countUsers} ${userGroupsMessages.users.toLowerCase()}`)}
            </Button>
          ) : undefined}
        </>
      )}

      <Divider className='mb-8 mt-3' />

      <Typography.Title className='mb-0 mt-0 pb-2 text-lg'>{userGroupsMessages.permissions}</Typography.Title>
      {showPermission && userGroupId ? (
        <List
          split={false}
          dataSource={userGroup?.permissions}
          rowKey={(item) => item.permissionId}
          renderItem={(item) => <List.Item className='py-2'>{item.name}</List.Item>}
        />
      ) : (
        <>
          {userGroup?.permissions && userGroup.permissions.length > 0 ? (
            <List
              split={false}
              dataSource={userGroup?.permissions.slice(0, DEFAULT_LIST_INFO_SIZE)}
              rowKey={(item) => item.permissionId}
              renderItem={(item) => <List.Item className='py-2'>{item.name}</List.Item>}
            />
          ) : undefined}
          {userGroup?.countPermissions && userGroup.countPermissions > DEFAULT_LIST_INFO_SIZE ? (
            <Button type='text' className='-mx-4 font-normal text-colorPrimary' onClick={() => setShowPermission(true)}>
              {messages.viewAll(`${userGroup.countPermissions} ${userGroupsMessages.permissions.toLowerCase()}`)}
            </Button>
          ) : undefined}
        </>
      )}
    </Drawer>
  );
};

export default UserGroupDrawer;
