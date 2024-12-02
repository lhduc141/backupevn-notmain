import { Layout } from 'antd';
import { logo } from 'assets';
import { Loadable } from 'components';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { RootState } from 'store';

function AuthLayout() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTE.HOME} replace />;
  }

  return (
    <Layout>
      <Layout.Content>
        <div className='relative flex h-screen max-h-screen flex-1 justify-center overflow-auto rounded-base bg-colorBgContainerAuth bg-crm-bg bg-cover p-8 pt-[10vh]'>
          <div className='pt-[78px]'>
            <div className='relative flex w-[560px] flex-col items-center justify-center rounded-xl bg-colorBgContainer px-[90px] pb-32 pt-28'>
              <div className='absolute -top-[78px] flex h-[156px] w-[156px] items-center justify-center rounded-full bg-colorBgContainer'>
                <img src={logo} alt='Logo' className='h-[120px] w-[120px]' />
              </div>
              <Loadable>
                <Outlet />
              </Loadable>
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default AuthLayout;
