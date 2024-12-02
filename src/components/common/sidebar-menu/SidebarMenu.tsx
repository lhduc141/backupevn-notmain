import { Divider, Layout, List, Typography } from 'antd';
import { logo, LogoutIcon } from 'assets';
import { Avatar } from 'components/common';
import { useActiveMenu, useLogout, useProfile } from 'hooks';
import { messages } from 'messages';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { sizes } from 'themes';
import { MENU_LIST_ITEM, MenuItemType } from 'utils';
import MenuItem from './MenuItem';
import SidebarSubsMenu from './SidebarSubsMenu';

const { Sider } = Layout;

type SidebarMenuProps = {
  onChangeCollapse?: (collapsed: boolean) => void;
};

const SidebarMenu = ({ onChangeCollapse }: SidebarMenuProps) => {
  const { profile } = useProfile();
  const timeoutSubItemRef = useRef<number | null>(null);
  const timeoutItemRef = useRef<number | null>(null);

  const { selectedMenu } = useActiveMenu();

  const { onLogoutHandle } = useLogout();

  const [collapsed, setCollapsed] = useState(true);
  const [collapsedSubMenu, setCollapsedSubMenu] = useState(true);

  const [itemSelected, setMenuSelected] = useState<MenuItemType | undefined>();

  const onCloseSubSider = () => {
    if (timeoutSubItemRef.current) {
      clearTimeout(timeoutSubItemRef.current);
    }
    timeoutSubItemRef.current = window.setTimeout(() => {
      setCollapsedSubMenu(true);
    }, 200);
  };
  const onOpenSubSider = () => {
    if (timeoutSubItemRef.current) {
      clearTimeout(timeoutSubItemRef.current);
    }
    setCollapsedSubMenu(false);
  };

  const onOpenSider = () => {
    setCollapsed(false);
    onChangeCollapse?.(false);
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
      if (onChangeCollapse) {
        window.setTimeout(() => {
          onChangeCollapse(true);
        }, 100);
      }
    }, 200);
  };
  const handleCollapsed = () => {
    setCollapsedSubMenu(true);
    setCollapsed(true);
  };

  return (
    <div className='sidebar-menu flex' onMouseEnter={onOpenSider} onMouseLeave={onCloseSider}>
      <Sider
        collapsed={collapsed}
        collapsedWidth={sizes.sidebarMenuCollapsed}
        width={sizes.sidebarMenu}
        className={twMerge('transition-all duration-[300ms]', collapsed && 'main-menu-sider-collapsed')}
      >
        <div className='content flex h-full flex-col pb-16 pt-6'>
          <div className='item-option mb-4'>
            <img src={logo} alt={messages.appName} className='logo-fade-in h-12 w-12' />
            <Typography.Text ellipsis className='font-semibold'>
              {messages.appName}
            </Typography.Text>
          </div>
          <List
            className='no-scrollbar w-full overflow-y-auto bg-transparent'
            dataSource={MENU_LIST_ITEM}
            renderItem={(item: MenuItemType, index: number) =>
              item.type === 'divider' ? (
                <Divider key={`divider-${index}`} />
              ) : (
                <MenuItem
                  key={item.key}
                  onClick={() => {
                    if (item.href) {
                      handleCollapsed();
                    }
                  }}
                  item={item}
                  onMouseEnter={() => {
                    if (item.children) {
                      setMenuSelected(item);
                      onOpenSubSider();
                    }
                  }}
                  onMouseLeave={onCloseSubSider}
                  disabled={!item.href && !item.children}
                  isActive={selectedMenu === item.key}
                  className={twMerge(itemSelected?.key === item.key && !collapsedSubMenu && 'bg-spotlightHover')}
                  icon={
                    item.icon === 'avatar' ? (
                      <Avatar size={collapsed ? 40 : 32} fileId={profile?.avatar} name={profile?.fullName} />
                    ) : (
                      <div>{item.icon}</div>
                    )
                  }
                />
              )
            }
          />
          <div onClick={() => onLogoutHandle()} className='item-option item-option-select mt-auto px-6'>
            <div>
              <LogoutIcon key='logout' width={24} height={24} />
            </div>
            <Typography.Text ellipsis>{messages.logout}</Typography.Text>
          </div>
        </div>
      </Sider>
      <SidebarSubsMenu
        collapsed={collapsedSubMenu}
        menuSelected={itemSelected}
        onMouseEnter={() => onOpenSubSider()}
        onMouseLeave={onCloseSubSider}
        onSelect={handleCollapsed}
      />
    </div>
  );
};

export default SidebarMenu;
