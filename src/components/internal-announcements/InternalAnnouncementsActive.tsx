import { Badge, Skeleton, Typography } from 'antd';
import { Empty, InfiniteScroll } from 'components/common';
import { useLazyInternalAnnouncementsActive } from 'hooks';
import { internalAnnouncementsMessages } from 'messages';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { convertTimeAgo } from 'utils';
type InternalAnnouncementsActiveProps = {
  setAnnouncementId: (value: number) => void;
  internalAnnouncementId?: number;
};
const InternalAnnouncementsActive: React.FC<InternalAnnouncementsActiveProps> = ({
  setAnnouncementId,
  internalAnnouncementId
}) => {
  const { data, hasMore, handleLoadMore, fetchData } = useLazyInternalAnnouncementsActive();

  useEffect(() => {
    fetchData(
      {
        pageIndex: 1
      },
      (rs) => {
        if (
          !internalAnnouncementId &&
          rs?.data.rows.length &&
          rs?.data.rows.length > 0 &&
          rs?.data.rows[0]?.internalAnnouncementId
        ) {
          setAnnouncementId(rs?.data.rows[0].internalAnnouncementId);
        }
      }
    );
  }, []);
  return (
    <div className='relative w-full'>
      {!data?.length || data.length === 0 ? (
        <div className='absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2'>
          <Empty description={internalAnnouncementsMessages.notHasAnnouncement} />
        </div>
      ) : (
        <InfiniteScroll
          hasMore={hasMore}
          next={handleLoadMore}
          loader={<Skeleton title={false} paragraph={{ rows: 2 }} active />}
        >
          <>
            {data.map((announcement) => (
              <div key={announcement.internalAnnouncementId}>
                <div
                  onClick={() => {
                    setAnnouncementId(announcement.internalAnnouncementId);
                  }}
                  className={twMerge(
                    'cursor-pointer px-6 py-3 transition-all hover:bg-colorBgContent',
                    internalAnnouncementId === announcement.internalAnnouncementId &&
                      'bg-colorBgContent hover:bg-colorBgContent'
                  )}
                >
                  <div>
                    <Badge dot={!!announcement.viewAt}>
                      <Typography.Title level={5} className='mb-4 pr-1'>
                        {announcement.title}
                      </Typography.Title>
                    </Badge>
                  </div>
                  <Typography.Text type='secondary' className='text-xs'>
                    {announcement.createdAt ? convertTimeAgo(announcement.createdAt, false) : '-'}
                  </Typography.Text>
                </div>
              </div>
            ))}
          </>
        </InfiniteScroll>
      )}
    </div>
  );
};
export default InternalAnnouncementsActive;
