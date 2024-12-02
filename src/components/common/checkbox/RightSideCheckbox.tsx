import { CheckOutlined } from '@ant-design/icons';
import { Button, List, Space, Typography } from 'antd';
import { uniq } from 'lodash';
import { messages } from 'messages';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CheckboxOptionItem = {
  key: string;
  label: string;
  value: string;
  children?: CheckboxOptionItem[];
};
type RightSideCheckboxProps = {
  options: CheckboxOptionItem[];
  prefix?: ReactNode;
  childrenPrefix?: ReactNode;
  value?: string[];
  split?: boolean;
  selectAll?: boolean;
  onChange: (value: string[]) => void;
};

const RightSideCheckbox = ({
  prefix,
  split = false,
  childrenPrefix,
  options,
  value = [],
  selectAll,
  onChange
}: RightSideCheckboxProps) => {
  const handleSelectMany = (addValue: string[]) => {
    const newValues = uniq([...value, ...addValue]);
    onChange?.(newValues);
  };

  const handleUnselectMany = (removeValue: string[]) => {
    const newValues = value.filter((val) => !removeValue.includes(val));
    onChange?.(newValues);
  };

  const handleChange = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      onChange(value.filter((value) => value !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  return (
    <List
      dataSource={options}
      rowKey={(item) => item.key}
      renderItem={(item) => {
        const selected = value?.includes(item.value);
        const childrenValue = item.children?.map((item) => item.value) ?? [];
        const selectedAllChildren = childrenValue.every((childValue) => value?.includes(childValue));
        const selectedChildren = childrenValue.filter((childValue) => value?.includes(childValue));
        return (
          <>
            <List.Item className={twMerge('px-0 py-[8px]', split ? 'border-b py-[10px]' : 'border-0')}>
              <div className='flex gap-x-[6px]'>
                {prefix}
                <Typography.Text className={twMerge(selectAll ? 'text-xs uppercase text-subTextColor' : '')}>
                  {item.label}
                </Typography.Text>
              </div>
              {selectAll && item.children && item.children.length > 0 ? (
                <Space
                  size={8}
                  split={<Typography.Text className='font-semibold text-colorPrimary'>•</Typography.Text>}
                >
                  {!selectedAllChildren && selectedChildren && selectedChildren.length > 0 ? (
                    <Button
                      type='link'
                      className='font-normal text-colorPrimary no-underline'
                      onClick={() => handleUnselectMany(selectedChildren)}
                    >
                      {messages.deleteButtonText}
                    </Button>
                  ) : undefined}
                  {selectedAllChildren ? (
                    <Button
                      type='link'
                      className='font-normal text-colorPrimary no-underline'
                      onClick={() => handleUnselectMany(childrenValue)}
                    >
                      {messages.deleteAllButtonText}
                    </Button>
                  ) : undefined}
                  {selectedAllChildren ? undefined : (
                    <Button
                      type='link'
                      className='font-normal text-colorPrimary no-underline'
                      onClick={() => handleSelectMany(childrenValue)}
                    >
                      {messages.selectAllButtonText}
                    </Button>
                  )}
                </Space>
              ) : (
                <Button
                  shape='circle'
                  type={selected ? 'primary' : 'default'}
                  className={selected ? '' : 'text-subTextColor hover:text-colorPrimaryActive'}
                  onClick={() => handleChange(item.value)}
                >
                  <CheckOutlined />
                </Button>
              )}
            </List.Item>
            {item.children && item.children.length > 0 && (
              <div className={twMerge(childrenPrefix ? 'pl-6' : '')}>
                <RightSideCheckbox
                  options={item.children}
                  prefix={childrenPrefix}
                  childrenPrefix={childrenPrefix}
                  onChange={onChange}
                  value={value}
                />
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default RightSideCheckbox;
