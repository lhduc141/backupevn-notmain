import { List, Skeleton, Typography } from 'antd';
import { Avatar, InfiniteScroll } from 'components/common';
import { useLazyUserGroupUsers } from 'hooks';
import { useEffect } from 'react';

type UserGroupUserListProps = {
  userGroupId: number;
  compact?: boolean;
};

const UserGroupUserList = ({ userGroupId, compact }: UserGroupUserListProps) => {
  const { fetchData, data, isLoading, hasMore, handleLoadMore } = useLazyUserGroupUsers();

  useEffect(() => {
    fetchData({ userGroupId });
  }, [userGroupId]);

  return (
    <InfiniteScroll
      isLoading={Boolean(isLoading)}
      next={handleLoadMore}
      hasMore={Boolean(hasMore)}
      loader={
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: 3
          }}
        />
      }
      endMessage={<p></p>}
    >
      <List
        split={false}
        dataSource={data}
        rowKey={(item) => item.userId}
        renderItem={(item) => (
          <List.Item>
            <div className='flex items-center gap-x-4'>
              <Avatar size={compact ? 32 : 48} fileId={item.avatar} name={item.fullName} />
              <div>
                <Typography.Text>{item.fullName}</Typography.Text>
                {compact ? undefined : <Typography.Paragraph className='mt-1'>{item.email}</Typography.Paragraph>}
              </div>
            </div>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
};

export default UserGroupUserList;
