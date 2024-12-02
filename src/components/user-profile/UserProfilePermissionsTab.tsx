import { Divider, Skeleton, Space, Typography } from 'antd';
import { useUserProfilePermissions } from 'hooks';
import { usersMessages } from 'messages/users.messages';

const UserProfilePermissionsTab = () => {
  const { userPermissions, isLoading } = useUserProfilePermissions();
  if (isLoading)
    return (
      <div>
        <Skeleton />
        <Divider className='my-4' />
        <Skeleton />
      </div>
    );
  return (
    <div>
      <Typography.Title className='mb-0' level={5}>
        {usersMessages.personal}
      </Typography.Title>
      <div className='my-2'>
        <Space direction='vertical' size={8}>
          {userPermissions?.permissions.map((itm) => (
            <Typography.Text key={itm.permissionId}>{itm.name}</Typography.Text>
          ))}
        </Space>
      </div>
      {userPermissions?.roles?.length ? (
        <div>
          <Space direction='vertical' size={8}>
            {userPermissions.roles.map((itm) => (
              <Typography.Text key={itm.roleId}>{itm.name}</Typography.Text>
            ))}
          </Space>
        </div>
      ) : null}
      <Divider className='my-6' />
      <Typography.Title className='mb-0' level={5}>
        {userPermissions?.userGroup?.name}
      </Typography.Title>
      <div className='my-2'>
        <Space direction='vertical' size={8}>
          {userPermissions?.userGroup?.permissions.map((itm) => (
            <Typography.Text key={itm.permissionId}>{itm.name}</Typography.Text>
          ))}
        </Space>
      </div>
      {userPermissions?.userGroup?.roles?.length ? (
        <div>
          <Space direction='vertical' size={8}>
            {userPermissions.userGroup.roles.map((itm) => (
              <Typography.Text key={itm.roleId}>{itm.name}</Typography.Text>
            ))}
          </Space>
        </div>
      ) : null}
    </div>
  );
};
export default UserProfilePermissionsTab;
