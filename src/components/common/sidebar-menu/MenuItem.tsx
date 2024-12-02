import { Typography } from 'antd';
import { RightIcon } from 'assets';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { MenuItemType } from 'utils';

type MenuItemProps = {
  item: MenuItemType;
  icon?: string | ReactNode;
  onClick?: (item: MenuItemType) => void;
  isActive?: boolean;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  key?: string;
  suffix?: ReactNode;
};
const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  item,
  onClick,
  isActive,
  disabled,
  className,
  suffix,
  ...props
}) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.(item);
  };
  const content = (
    <div
      className={twMerge(
        'item-option item-option-select px-6',
        item.icon === 'avatar' && 'item-option-avatar px-5',
        disabled && 'item-option-disabled',
        isActive && 'item-option-active',
        className
      )}
      {...props}
    >
      {icon && <div>{icon}</div>}
      <Typography.Text ellipsis>{item.label}</Typography.Text>

      {item.children && (
        <Typography.Text className='ml-auto'>
          <RightIcon />
        </Typography.Text>
      )}
      {suffix && <Typography.Text className='ml-auto'>{suffix}</Typography.Text>}
    </div>
  );
  if (item.href && !disabled)
    return (
      <Link onClick={handleClick} to={item.href}>
        {content}
      </Link>
    );
  return <div onClick={handleClick}>{content}</div>;
};
export default MenuItem;
