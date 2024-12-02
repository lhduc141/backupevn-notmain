import { List, Skeleton, Typography } from 'antd';
import { Avatar, InfiniteScroll } from 'components/common';
import { useLazyOrganizationUnitUsers } from 'hooks';
import { useEffect } from 'react';

type OrganizationUnitUserListProps = {
  organizationUnitId: number;
  compact?: boolean;
};

const OrganizationUnitUserList = ({ organizationUnitId, compact }: OrganizationUnitUserListProps) => {
  const { fetchData, data, isLoading, hasMore, handleLoadMore } = useLazyOrganizationUnitUsers();

  useEffect(() => {
    fetchData({ organizationUnitId });
  }, [organizationUnitId]);

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

export default OrganizationUnitUserList;
