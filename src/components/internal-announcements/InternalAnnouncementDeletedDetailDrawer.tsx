import { DrawerProps, TabsProps, Typography } from 'antd';
import { Drawer, TabButtons } from 'components/common';
import { internalAnnouncementsMessages } from 'messages';
import { useGetInternalAnnouncementDeletedDetailQuery } from 'services';
import InternalAnnouncementInfo from './InternalAnnouncementInfo';
import InternalAnnouncementStatistic from './InternalAnnouncementStatistic';
import { useState } from 'react';

export type InternalAnnouncementDetailProps = DrawerProps & {
  internalAnnouncementId?: number;
};

const InternalAnnouncementDeletedDetailDrawer = ({
  internalAnnouncementId,
  ...props
}: InternalAnnouncementDetailProps) => {
  const { data: internalAnnouncement, isLoading: isLoadingDetail } = useGetInternalAnnouncementDeletedDetailQuery(
    internalAnnouncementId!,
    {
      skip: !internalAnnouncementId,
      refetchOnMountOrArgChange: true
    }
  );
  const [selectedTab, setSelectedTab] = useState('1');

  const data = internalAnnouncement?.data;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: internalAnnouncementsMessages.info
    },
    {
      key: '2',
      label: internalAnnouncementsMessages.statistic
    }
  ];
  return (
    <Drawer {...props} loading={isLoadingDetail} width={680}>
      {data && (
        <div className='flex h-full flex-col'>
          <div>
            <Typography.Title level={3}>{data.title}</Typography.Title>
          </div>
          <TabButtons items={items} activeKey={selectedTab} onClick={setSelectedTab} />
          <div className='mt-8 flex flex-1 flex-col'>
            {selectedTab === '1' && <InternalAnnouncementInfo data={data} isLoading={isLoadingDetail} />}
            {selectedTab === '2' && <InternalAnnouncementStatistic data={data} isLoading={isLoadingDetail} />}
          </div>
        </div>
      )}
    </Drawer>
  );
};
export default InternalAnnouncementDeletedDetailDrawer;
