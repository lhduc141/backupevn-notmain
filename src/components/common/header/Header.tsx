import { Button, Divider, Layout, Typography } from 'antd';
import { ChatIcon, HourglassIcon, PhoneCallIcon, RightIcon } from 'assets';
import { InternalChatManage } from 'components/internal-chat';
import { NotesManage } from 'components/notes';
import { NotificationsManage } from 'components/notifications';
import { CurrentActiveShift } from 'components/shifts';
import { useProfile } from 'hooks';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectHasSelectShiftPermission } from 'store/features';
import { twMerge } from 'tailwind-merge';
import { ID_CRM_HEADER } from 'utils';

const { Header: HeaderAntd } = Layout;

const Header = () => {
  const location = useLocation();
  const { profile } = useProfile();
  const hasSelectShiftPermission = useSelector(selectHasSelectShiftPermission);

  useEffect(() => {
    const crmHeader = document.getElementById(ID_CRM_HEADER);
    if (crmHeader) {
      crmHeader.innerHTML = '';
    }
  }, [location.pathname]);

  return (
    <div>
      <HeaderAntd className='flex items-center bg-colorBgHeader px-8'>
        <div id={ID_CRM_HEADER} />
        {location.pathname === '/customer-lookup' ? (
          <Typography.Text className='text-left text-[24px]/[20px] font-bold tracking-normal text-[#141414] opacity-100'>
            Tra cứu khách hàng
          </Typography.Text>
        ) : (
          <></>
        )}
        <div className='ml-auto' />
        <div className='rounded-full bg-textHoverBg px-4 leading-10'>
          <Typography.Text className='text-sm'>{profile?.organizationUnit?.name}</Typography.Text>
        </div>
        {hasSelectShiftPermission && (
          <div className='ml-2'>
            <CurrentActiveShift />
          </div>
        )}
        <NotesManage />
        <InternalChatManage />
        <NotificationsManage />

        <Divider type='vertical' className='mx-5 h-10' />

        <div className='flex h-10 cursor-pointer items-center overflow-hidden rounded-full border border-defaultBorderColor'>
          <Button
            disabled
            icon={
              <PhoneCallIcon
                // className='text-[#d1131c]'
                height={20}
                width={20}
              />
            }
            type='text'
            className='h-10 w-13 rounded-none'
          />
          <Divider type='vertical' className='mx-0 h-6' />
          <Button
            disabled
            icon={<HourglassIcon height={20} width={20} />}
            type='text'
            className='h-10 w-[60px] rounded-none text-sm font-normal'
          >
            0
          </Button>
          <Divider type='vertical' className='mx-0 h-6' />
          <Button disabled type='text' className='h-10 rounded-none px-4 text-sm font-normal underline'>
            Đàm thoại <RightIcon className='rotate-90' />
          </Button>
        </div>
        <div className='ml-2 flex h-10 cursor-pointer items-center overflow-hidden rounded-full border border-defaultBorderColor'>
          <Button
            disabled
            icon={
              <ChatIcon
                // className='text-[#06a77d]'
                height={20}
                width={20}
              />
            }
            type='text'
            className={twMerge('h-10 w-13')}
          />
          <Divider type='vertical' className='mx-0 h-6' />
          <Button
            disabled
            icon={<HourglassIcon height={20} width={20} />}
            type='text'
            className='h-10 w-[60px] rounded-none text-sm font-normal'
          >
            0
          </Button>
        </div>
      </HeaderAntd>
    </div>
  );
};
export default memo(Header);
