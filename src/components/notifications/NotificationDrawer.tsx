import { Button, Drawer, Tabs, TabsProps, Typography } from 'antd';
import { CloseIcon } from 'assets';
import { notificationsMessages } from 'messages';
import { useEffect, useRef, useState } from 'react';
import { useReadAllNotificationsMutation } from 'services';
import NotificationList, { NotificationListRefProps } from './NotificationList';

type NotificationDrawerProps = {
  open: boolean;
  onCancel: () => void;
};
const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onCancel }) => {
  const [readAllNotif, { isLoading }] = useReadAllNotificationsMutation();

  const listRef = useRef<NotificationListRefProps>(null);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: notificationsMessages.notifications,
      children: <NotificationList ref={listRef} closeDrawer={onCancel} />
    }
  ];
  const [shouldDestroy, setShouldDestroy] = useState(true);
  const firstOpen = useRef(true);

  useEffect(() => {
    if (firstOpen) {
      setShouldDestroy(false);
      firstOpen.current = false;
    }
  }, [open]);

  const handleReadAll = () => {
    readAllNotif()
      .unwrap()
      .then(() => {
        if (listRef.current) {
          listRef.current.refetch();
        }
      });
  };

  return (
    <>
      <Drawer
        prefixCls='notification-drawer'
        title={
          <Typography.Title className='mb-0' level={4}>
            {notificationsMessages.notifications}
          </Typography.Title>
        }
        open={open}
        onClose={onCancel}
        width={320}
        destroyOnClose={shouldDestroy}
        closeIcon={<CloseIcon />}
        footer={
          <div>
            <Button
              loading={isLoading}
              onClick={handleReadAll}
              className='text-sm font-normal text-colorTextBase'
              type='link'
            >
              {notificationsMessages.readAll}
            </Button>
          </div>
        }
      >
        <Tabs prefixCls='notifications-tabs' items={items} defaultActiveKey='1'></Tabs>
      </Drawer>
    </>
  );
};

export default NotificationDrawer;
