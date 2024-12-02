import { Badge, Button } from 'antd';
import { BellIcon } from 'assets';
import { useNotificationsUnreadCount } from 'hooks';
import { useEffect, useState } from 'react';
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
  offReceiveNotification,
  onReceiveNotification
} from 'services';
import { twMerge } from 'tailwind-merge';
import NotificationDrawer from './NotificationDrawer';

type NotificationsManageProps = {};
const NotificationsManage: React.FC<NotificationsManageProps> = () => {
  const { data: notificationUnread } = useNotificationsUnreadCount();
  const [notificationOpen, setNotificationOpen] = useState(false);
  useEffect(() => {
    connectNotificationSocket();
    onReceiveNotification();
    return () => {
      disconnectNotificationSocket();
      offReceiveNotification();
    };
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setNotificationOpen(true);
        }}
        icon={
          <Badge
            prefixCls='header-badge'
            offset={[-5, 5]}
            dot={!!notificationUnread}
            size='small'
            count={notificationUnread}
          >
            <BellIcon height={20} width={20} />
          </Badge>
        }
        type='text'
        shape='circle'
        className={twMerge('h-10 w-10', notificationOpen && 'active-btn')}
      />
      <NotificationDrawer
        onCancel={() => {
          setNotificationOpen(false);
        }}
        open={notificationOpen}
      />
    </>
  );
};
export default NotificationsManage;
