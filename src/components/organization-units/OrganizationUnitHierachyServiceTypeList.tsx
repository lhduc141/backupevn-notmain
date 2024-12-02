import { List, Spin, Typography } from 'antd';
import { useGetOrganizationUnitServiceTypesHierachyQuery } from 'services';

type OrganizationUnitServiceTypeListProps = {
  organizationUnitId: number;
};

const OrganizationUnitServiceTypeList = ({ organizationUnitId }: OrganizationUnitServiceTypeListProps) => {
  const { data, isLoading } = useGetOrganizationUnitServiceTypesHierachyQuery(organizationUnitId);

  return (
    <Spin spinning={isLoading}>
      <List
        dataSource={data?.data.rows}
        rowKey={(item) => item.serviceTypeId}
        renderItem={(item) => (
          <List.Item className='mb-5 pb-5 pt-0'>
            <div>
              <Typography.Paragraph type='secondary' className='my-2 text-xs font-semibold'>
                {item.name.toUpperCase()}
              </Typography.Paragraph>
              {item.childrenCompact?.flat(Infinity).map((child) => (
                <div key={child.serviceTypeId}>
                  <Typography.Paragraph className='my-3'>{child.name}</Typography.Paragraph>
                </div>
              ))}
            </div>
          </List.Item>
        )}
      />
    </Spin>
  );
};

export default OrganizationUnitServiceTypeList;
