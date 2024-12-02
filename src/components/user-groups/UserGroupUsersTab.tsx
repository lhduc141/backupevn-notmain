import { Divider, List, Skeleton, Typography } from 'antd';
import { Avatar, Empty } from 'components/common';
import { useGetUserGroupDetailQuery } from 'services';
import { UserGroupUpdateUsersModal } from '.';
type UserGroupUsersTabProp = {
  userGroupId: number;
  openUpdate: boolean;
  setOpenUpdate: (val: boolean) => void;
};
const UserGroupUsersTab = ({ userGroupId, openUpdate, setOpenUpdate }: UserGroupUsersTabProp) => {
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
      <List
        itemLayout='horizontal'
        dataSource={userGroup?.users}
        rowKey={(item) => item.userId}
        locale={{
          emptyText: <Empty />
        }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar name={item.fullName} fileId={item.avatar} />}
              title={<Typography.Text>{item.fullName}</Typography.Text>}
              description={<Typography.Text>{item.fullName}</Typography.Text>}
            />
          </List.Item>
        )}
      />
      <UserGroupUpdateUsersModal
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
export default UserGroupUsersTab;
