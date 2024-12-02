import { List, Skeleton } from 'antd';
import { InfiniteScroll } from 'components/common';
import { useLazyOrganizationUnitChildren } from 'hooks';
import { useEffect } from 'react';

type OrganizationUnitChildrenListProps = {
  organizationUnitId: number;
};

const OrganizationUnitChildrenList = ({ organizationUnitId }: OrganizationUnitChildrenListProps) => {
  const { fetchData, organizationsUnits, isLoading, hasMore, handleLoadMore } = useLazyOrganizationUnitChildren();

  useEffect(() => {
    fetchData({ organizationUnitId: organizationUnitId });
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
        dataSource={organizationsUnits}
        rowKey={(item) => item.organizationUnitId}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </InfiniteScroll>
  );
};

export default OrganizationUnitChildrenList;
