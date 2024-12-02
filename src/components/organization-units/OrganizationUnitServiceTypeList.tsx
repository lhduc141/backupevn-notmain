import { List, Skeleton, Typography } from 'antd';
import { InfiniteScroll } from 'components/common';
import { useLazyOrganizationUnitServiceTypes } from 'hooks';
import { useEffect } from 'react';

type OrganizationUnitServiceTypeListProps = {
  organizationUnitId: number;
};

const OrganizationUnitServiceTypeList = ({ organizationUnitId }: OrganizationUnitServiceTypeListProps) => {
  const { fetchData, data, isLoading, hasMore, handleLoadMore } = useLazyOrganizationUnitServiceTypes();

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
      {data.length > 0 && (
        <List
          split={false}
          dataSource={data}
          rowKey={(item) => item.serviceTypeId}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.name}</Typography.Text>
            </List.Item>
          )}
        />
      )}
    </InfiniteScroll>
  );
};

export default OrganizationUnitServiceTypeList;
