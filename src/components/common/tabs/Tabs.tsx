import { Button, Tabs, Typography } from 'antd';
import { memo, ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tab as TabProps } from 'rc-tabs/lib/interface';

export type TabItem = TabProps & {
  extra?: () => ReactNode;
};

type TabButtonsProps = {
  items: TabItem[];
  activeKey?: string;
  onClick?: (key: string) => void;
  className?: string;
  defaultActiveKey?: string;
};

const TabButtons = ({ items, activeKey, onClick, className, defaultActiveKey }: TabButtonsProps) => {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(activeKey);

  useEffect(() => {
    setSelectedKey(activeKey);
  }, [activeKey]);

  const onClickItem = (itemKey: string) => {
    setSelectedKey(itemKey);
    onClick?.(itemKey);
  };

  const selectedItem = items.find((item) => item.key === selectedKey);

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      items={items}
      renderTabBar={() => (
        <div className={twMerge('flex justify-between', className)}>
          <div className='flex gap-x-2'>
            {items?.map((item) => (
              <Button
                onClick={() => onClickItem(item.key)}
                key={item.key}
                className={twMerge(
                  selectedKey === item.key ? 'bg-colorTextLabel' : 'bg-colorBgContainerSecondary',
                  'h-9 rounded-[18px] border'
                )}
              >
                <Typography.Text
                  className={twMerge(
                    'text-sm font-semibold',
                    selectedKey === item.key ? 'text-colorTextContrast' : 'text-colorTextBase'
                  )}
                >
                  {item.label}
                </Typography.Text>
              </Button>
            ))}
          </div>
          {selectedItem?.extra?.()}
        </div>
      )}
    />
  );
};

export default memo(TabButtons);
