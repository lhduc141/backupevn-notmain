import { Divider, Skeleton, Space, Typography } from 'antd';
import { Empty } from 'components/common';
import { userGroupsMessages } from 'messages';
import { useGetUserGroupDetailQuery } from 'services';
import { UserGroupUpdatePermisisonsModal } from '.';
type UserGroupPermissionsTabProp = {
  userGroupId: number;
  openUpdate: boolean;
  setOpenUpdate: (val: boolean) => void;
};
const UserGroupPermissionsTab = ({ userGroupId, openUpdate, setOpenUpdate }: UserGroupPermissionsTabProp) => {
  const { data: userGroupRes, isLoading } = useGetUserGroupDetailQuery(userGroupId!, {
    skip: !userGroupId
  });
  const userGroup = userGroupRes?.data;

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
      <Typography.Title className='mb-2' level={5}>
        {userGroupsMessages.permissions}
      </Typography.Title>
      {userGroup?.permissions?.length && userGroup?.permissions?.length > 0 ? (
        <Space direction='vertical' size={8}>
          {userGroup?.permissions?.map((itm) => <Typography.Text key={itm.permissionId}>{itm.name}</Typography.Text>)}{' '}
        </Space>
      ) : (
        <Empty />
      )}
      <Divider className='my-4' />
      <Typography.Title className='mb-2' level={5}>
        {userGroupsMessages.roles}
      </Typography.Title>
      {userGroup?.roles?.length && userGroup.roles.length > 0 ? (
        <Space direction='vertical' size={8}>
          {userGroup?.roles?.map((itm) => <Typography.Text key={itm.roleId}>{itm.name}</Typography.Text>)}{' '}
        </Space>
      ) : (
        <Empty />
      )}
      <UserGroupUpdatePermisisonsModal
        open={openUpdate}
        userGroupId={userGroupId}
        onCancel={() => {
          setOpenUpdate(false);
        }}
        onClose={() => {
          setOpenUpdate(false);
        }}
      />
    </div>
  );
};
export default UserGroupPermissionsTab;
