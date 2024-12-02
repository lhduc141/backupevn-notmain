import { Skeleton, Spin, Typography } from 'antd';
import { InfiniteScroll } from 'components/common';
import { useLazyNotifications } from 'hooks/notifications';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useReadNotificationMutation } from 'services';
import { NotificationDto } from 'types';
import { NOTIFICATION_TYPE, convertTimeAgo } from 'utils';

type NotificationListProps = {
  closeDrawer?: () => void;
};
export type NotificationListRefProps = {
  refetch: () => void;
};
const NotificationList = forwardRef<NotificationListRefProps, NotificationListProps>(({ closeDrawer }, ref) => {
  useImperativeHandle(ref, () => ({
    refetch: handleRefetch
  }));

  const navigate = useNavigate();
  const { fetchData, data: notifications, hasMore, handleLoadMore } = useLazyNotifications();
  const [readNotif, { isLoading }] = useReadNotificationMutation();
  useEffect(() => {
    fetchData();
  }, []);

  const handleReadNotif = (notif: NotificationDto) => {
    readNotif(notif.notificationId)
      .unwrap()
      .then(() => handleRefetch());
    switch (notif.type) {
      case NOTIFICATION_TYPE.INTERNAL_NOTIFICATION:
        navigate({
          pathname: ROUTE.CUSTOMER_LOOKUP,
          search: `?IA=${notif.refId}`
        });
        closeDrawer?.();
        break;
      default:
    }
  };
  const handleRefetch = () => {
    fetchData({
      limit: notifications.length,
      skip: 0
    });
  };
  return (
    <Spin spinning={isLoading}>
      <div className='h-full max-h-[calc(100vh-186px)] overflow-auto'>
        <InfiniteScroll
          hasMore={hasMore}
          next={handleLoadMore}
          loader={<Skeleton active={isLoading} title={false} paragraph={{ rows: 5 }} />}
        >
          {notifications.map((notif) => (
            <div
              onClick={() => handleReadNotif(notif)}
              key={notif.notificationId}
              className='relative cursor-pointer border-b border-colorBorder px-5 py-6 hover:bg-colorBgItemHover'
            >
              <div className='w-[calc(100%-24px)]'>
                <Typography.Paragraph className='mb-3 font-semibold' ellipsis={{ rows: 2, tooltip: true }}>
                  {notif.content}
                </Typography.Paragraph>

                <Typography.Text className='text-xs' type='secondary'>
                  {convertTimeAgo(notif.createdAt)}
                </Typography.Text>
              </div>
              {!notif.isRead && (
                <div className='absolute right-5 top-[30px]'>
                  <div className='h-2 w-2 rounded-full bg-[#02D8A0]'></div>
                </div>
              )}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </Spin>
  );
});

export default NotificationList;
