import { Button, Typography } from 'antd';
import { PlusIcon } from 'assets';
import { PageHeader, TabButtons, TabItem } from 'components';
import { useTitle } from 'hooks';
import { messages, permissionsMessages, rolesMessages, sidebarMenuMessages } from 'messages';
import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';

function PermissionLayout({ children }: PropsWithChildren) {
  useTitle(sidebarMenuMessages.permissions);
  const location = useLocation();
  const navigate = useNavigate();

  const tabItems: TabItem[] = [
    {
      key: ROUTE.PERMISSIONS,
      label: permissionsMessages.page
    },
    {
      key: ROUTE.ROLES,
      label: rolesMessages.title,
      extra: () => (
        <Button
          onClick={() => {
            document.getElementById('create-new-role')?.click();
          }}
          type='primary'
          icon={<PlusIcon />}
        >
          {messages.createButtonText}
        </Button>
      )
    }
  ];

  const handleClickTab = (tabKey: string) => {
    navigate(tabKey);
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.permissions}
        </Typography.Title>
      </PageHeader>
      <div className='h-full rounded-xl bg-colorBgContainer'>
        <TabButtons
          className='min-h-[88px] items-center p-6'
          items={tabItems}
          onClick={(tabKey) => handleClickTab(tabKey as string)}
          activeKey={location.pathname}
        />
        <div className='max-h-[calc(100%-56px)]'>{children}</div>
      </div>
    </div>
  );
}

export default PermissionLayout;
