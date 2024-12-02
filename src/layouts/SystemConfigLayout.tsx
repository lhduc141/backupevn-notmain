import { TabsProps, Typography } from 'antd';
import { PageHeader, TabButtons } from 'components';
import { useTitle } from 'hooks';
import { sidebarMenuMessages, systemConfigsMessages } from 'messages';
import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';

function SystemConfigLayout({ children }: PropsWithChildren) {
  useTitle(sidebarMenuMessages.systemConfigs);
  const location = useLocation();
  const navigate = useNavigate();

  const tabItems: TabsProps['items'] = [
    {
      key: ROUTE.RATING_SYSTEM,
      label: systemConfigsMessages.ratingSystem
    }
  ];

  const handleClickTab = (tabKey: string) => {
    navigate(tabKey);
  };

  return (
    <div>
      <PageHeader className='flex items-center gap-1'>
        <Typography.Title className='mb-0 text-2.5xl font-bold' level={4}>
          {sidebarMenuMessages.systemConfigs}
        </Typography.Title>
      </PageHeader>
      <div className='rounded-xl bg-colorBgContainer p-5'>
        <TabButtons
          className='justify-center'
          items={tabItems}
          onClick={(tabKey) => handleClickTab(tabKey as string)}
          activeKey={location.pathname}
        />
        {children}
      </div>
    </div>
  );
}

export default SystemConfigLayout;
