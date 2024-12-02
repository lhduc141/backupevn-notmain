import { Divider, Layout, List, Typography } from 'antd';
import { useActiveMenu } from 'hooks';
import React, { memo, useMemo } from 'react';
import { sizes } from 'themes';
import { MenuItemType } from 'utils';
import MenuItem from './MenuItem';

const { Sider } = Layout;
type SidebarSubsMenuProps = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  collapsed: boolean;
  menuSelected?: MenuItemType;
  onSelect: () => void;
};

const SidebarSubsMenu: React.FC<SidebarSubsMenuProps> = ({
  onMouseEnter,
  onMouseLeave,
  collapsed,
  menuSelected,
  onSelect
}) => {
  const { selectedSubMenu } = useActiveMenu();

  const data = useMemo(() => {
    return menuSelected?.children ?? [];
  }, [menuSelected?.children]);
  return (
    <Sider
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      collapsed={collapsed}
      collapsedWidth={0}
      width={sizes.sidebarMenu}
      className='transition-all duration-[250ms]'
    >
      <div className='content flex h-full flex-col bg-[#0000003D] pb-3 pt-6'>
        <div className='flex h-[52px] items-center px-6'>
          <Typography.Text ellipsis className='mb-0 whitespace-nowrap text-0.5xl font-semibold text-white'>
            {menuSelected?.label}
          </Typography.Text>
        </div>
        <List
          className='no-scrollbar w-full overflow-y-auto bg-transparent'
          dataSource={data}
          rowKey={(item) => `${item.key}`}
          renderItem={(item: MenuItemType, index: number) =>
            item.type === 'divider' ? (
              <Divider key={`divider-${index}`} />
            ) : (
              <MenuItem
                key={item.key}
                onClick={() => {
                  onSelect();
                }}
                item={item}
                disabled={!item.href && !item.children}
                isActive={selectedSubMenu === item.key}
                icon={item.icon}
              />
            )
          }
        />
      </div>
    </Sider>
  );
};

export default memo(SidebarSubsMenu);
