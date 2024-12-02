import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Popover, Row, Space } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { messages } from 'messages';
import { PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type FilterProps = {
  content?: any;
  onChange?: (value: any) => void;
  setValueTemp?: any;
  title?: any;
  value?: any;
  valueTemp?: any;
  onOpenChange?: (value: boolean) => void;
  clearFilter?: any;
  allowClear?: boolean;
  icon?: React.JSX.Element;
  disabled?: boolean;
  extraFooter?: ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => void;
  children?: ReactNode;
  placement?: TooltipPlacement;
};
export type FilterPopoverOptionItem = {
  label: string | ReactNode;
  value: string | number | boolean | undefined;
  disabled?: boolean;
};

const FilterOrigin = ({
  children,
  setValueTemp,
  valueTemp,
  extraFooter,
  onOpenChange = () => {},
  allowClear = true,
  onChange,
  content,
  clearFilter,
  value,
  disabled,
  ...props
}: PropsWithChildren<FilterProps>) => {
  const [open, setOpen] = useState(false);

  const contentRender = (
    <div>
      {content}

      <Row align='middle' justify='space-between' className='-mx-6 -mb-2 border-t px-6 pt-2'>
        {(extraFooter &&
          extraFooter({
            open,
            setOpen
          })) ||
          null}
        {allowClear ? (
          <Button
            className='h-8 text-sm'
            type='link'
            onClick={() => {
              if (clearFilter) {
                clearFilter();
              } else {
                setValueTemp(undefined);
              }
            }}
          >
            Xóa
          </Button>
        ) : (
          <div />
        )}
        <Button
          className='ml-2 h-8 text-sm'
          type='primary'
          onClick={() => {
            if (onChange) onChange(valueTemp);
            setOpen(false);
          }}
        >
          {messages.saveButtonText}
        </Button>
      </Row>
    </div>
  );
  const active = Array.isArray(value) ? value.filter((o) => o)?.length > 0 : value !== undefined;
  const childrenLabel = useCallback(() => children, [!open && children]);
  return (
    <Popover
      placement='bottomRight'
      {...props}
      content={contentRender || null}
      onOpenChange={(op) => {
        if (disabled) return;
        setOpen(op);
        if (op) setValueTemp(value);
        if (onOpenChange) onOpenChange(op);
      }}
      open={disabled ? false : open}
      trigger='click'
      overlayClassName='popover-filter'
      destroyTooltipOnHide
    >
      <Space className={twMerge(`filter-popover`, (open || active) && 'active', disabled && 'select-none opacity-30')}>
        {childrenLabel()}
        <CaretDownOutlined className='ant-select-suffix' />
      </Space>
    </Popover>
  );
};

export default FilterOrigin;
