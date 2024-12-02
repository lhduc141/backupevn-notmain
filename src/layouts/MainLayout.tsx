import { Layout, Spin } from 'antd';
import { ActiveShiftsModal, Header, Loadable, SecondSiderMenu, SidebarMenu } from 'components';
import { useGetShiftMeActive, useProfile } from 'hooks';
import { shiftsMessages } from 'messages';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { twMerge } from 'tailwind-merge';
import { LOCAL_STORAGE_KEY } from 'utils';

const { Sider } = Layout;

function MainLayout() {
  const { isAuthenticated } = useProfile();
  const { isLoading: isLoadingShiftMeActive, hasSelectShiftPermission } = useGetShiftMeActive();
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  if (!localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) || !isAuthenticated) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return (
    <Spin tip={shiftsMessages.loadShift} spinning={isLoadingShiftMeActive && hasSelectShiftPermission}>
      <Layout>
        <Sider className='sider-layout'>
          <div className='relative'>
            <div className={twMerge('absolute left-0', collapsedSidebar ? 'z-[100]' : 'z-[2000]')}>
              <SidebarMenu onChangeCollapse={setCollapsedSidebar} />
            </div>
            <SecondSiderMenu />
          </div>
        </Sider>
        <Layout>
          <Header />
          <Layout className='h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-y-auto px-8 pb-5'>
            <Loadable>
              <Outlet />
            </Loadable>
          </Layout>
        </Layout>
        <ActiveShiftsModal />
      </Layout>
    </Spin>
  );
}

export default MainLayout;
