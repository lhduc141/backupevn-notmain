import { Badge, Divider, Layout, Typography } from 'antd';
import { CalendarIcon, NotificationIcon } from 'assets';
import { MenuItem } from 'components/common';
import { CustomerSupportInformationList } from 'components/customer-support-information';
import CustomerSupportInformationDetail from 'components/customer-support-information/CustomerSupportInformationDetail';
import { InternalAnnouncementsModal } from 'components/internal-announcements';
import dayjs from 'dayjs';
import { useInternalAnnouncementsUnreadCount, useSearchParamsForm } from 'hooks';
import { sidebarMenuMessages } from 'messages';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { colorsBase, sizes } from 'themes';
import { CustomerSupportInformationDto } from 'types';
import { DATE_FORMAT, DAY_FORMAT, SIDEBAR_MENU_KEY, TIME_FORMAT } from 'utils';

const { Sider } = Layout;

const SideBarMenuCustomerLookup = () => {
  const { getSearchParams } = useSearchParamsForm();
  const { IA } = getSearchParams();
  const { data: unreadCount } = useInternalAnnouncementsUnreadCount();

  const timeoutItemRef = useRef<number | null>(null);

  const [collapsed, setCollapsed] = useState(true);
  const [openInternalAnnouncement, setOpenInternalAnnouncement] = useState(false);
  const [openCustomerSupportInfo, setOpenCustomerSupportInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<Omit<CustomerSupportInformationDto, 'content'>>();

  useEffect(() => {
    if (IA) {
      setOpenInternalAnnouncement(true);
    }
  }, [IA]);

  const onOpenSider = () => {
    setCollapsed(false);
    if (timeoutItemRef.current) {
      clearTimeout(timeoutItemRef.current);
    }
  };
  const onCloseSider = () => {
    if (timeoutItemRef.current) {
      clearTimeout(timeoutItemRef.current);
    }
    timeoutItemRef.current = window.setTimeout(() => {
      setCollapsed(true);
    }, 400);
  };
  const handleCollapsed = () => {
    setCollapsed(true);
  };

  const [time, setTime] = useState<Date>(new Date());
  let intervalId: NodeJS.Timeout;
  useEffect(() => {
    startClock();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      stopClock();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  const startClock = () => {
    updateClock();
    const now = new Date();
    /** Tính toán số milliseconds còn lại cho đến đầu phút tiếp theo */
    const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
    /** Đặt timeout để cập nhật lại đồng hồ chính xác vào đầu phút tiếp theo */
    setTimeout(function () {
      updateClock();
      intervalId = setInterval(updateClock, 1000 * 60);
    }, delay);
  };

  const updateClock = () => {
    setTime(new Date());
  };

  const stopClock = () => {
    clearInterval(intervalId);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopClock();
    } else {
      startClock();
    }
  };
  return (
    <div>
      <div className='sidebar-menu flex' onMouseEnter={onOpenSider} onMouseLeave={onCloseSider}>
        <Sider
          collapsed={collapsed}
          collapsedWidth={56}
          width={sizes.sidebarMenu}
          className={twMerge('transition-all duration-[300ms]', collapsed && 'main-menu-sider-collapsed')}
        >
          <div className='content flex h-full flex-col bg-colorBgSpotlight pb-16 pt-4'>
            <div className={twMerge('flex h-14 items-center px-4', collapsed && 'px-[6px]')}>
              <Typography.Text
                ellipsis
                className={twMerge(
                  'clock-time font-[Orbitron] font-extrabold text-white transition-all',
                  collapsed ? 'text-sm' : 'text-2xl'
                )}
              >
                {dayjs(time).format(TIME_FORMAT)}
              </Typography.Text>
            </div>
            <Divider prefixCls='customer-lookup-divider' />

            {collapsed ? (
              <div className='flex h-12 flex-col items-center whitespace-nowrap'>
                <Typography.Text ellipsis className='text-0.5xl font-extrabold text-white'>
                  {dayjs(time).format('DD')}
                </Typography.Text>
                <Typography.Text className='text-[10px] font-extrabold text-white'>
                  Tháng {dayjs(time).format('M')}
                </Typography.Text>
              </div>
            ) : (
              <div className='item-option h-12 px-4'>
                <Typography.Text ellipsis className={twMerge('font-semibold')}>
                  {dayjs(time).format(DAY_FORMAT)}, {dayjs(time).format(DATE_FORMAT)}
                </Typography.Text>
                <div className='ml-auto'>
                  <CalendarIcon />
                </div>
              </div>
            )}

            <Divider prefixCls='customer-lookup-divider' />
            <MenuItem
              onClick={() => {
                handleCollapsed();
                setOpenInternalAnnouncement(true);
              }}
              item={{
                key: SIDEBAR_MENU_KEY.INTERNAL_ANNOUNCEMENTS,
                label: (
                  <Typography.Text className='text-white'>
                    {sidebarMenuMessages.internalAnnouncement}
                    {unreadCount ? (
                      <Typography.Text className='ml-2 rounded-lg bg-colorBgSuccess px-2 text-sm text-white'>
                        {unreadCount}
                      </Typography.Text>
                    ) : undefined}
                  </Typography.Text>
                )
              }}
              icon={
                <Badge dot={collapsed && !!unreadCount} color={colorsBase.colorBgSuccess}>
                  <NotificationIcon className='text-white' />
                </Badge>
              }
              className='px-4'
            />
            <Divider prefixCls='customer-lookup-divider' />
            <div className='h-full w-full overflow-y-auto overflow-x-hidden'>
              <CustomerSupportInformationList
                handleOnSelectItem={(itm) => {
                  setOpenCustomerSupportInfo(true);
                  setCustomerInfo(itm);
                }}
                handleCollapsed={handleCollapsed}
              />
            </div>
          </div>
        </Sider>
      </div>
      <InternalAnnouncementsModal
        open={openInternalAnnouncement}
        onCancel={() => {
          setOpenInternalAnnouncement(false);
        }}
      />
      <CustomerSupportInformationDetail
        open={openCustomerSupportInfo}
        onCancel={() => {
          setOpenCustomerSupportInfo(false);
        }}
        customerSupportInformationId={customerInfo?.customerSupportInformationId}
      />
    </div>
  );
};

export default SideBarMenuCustomerLookup;
