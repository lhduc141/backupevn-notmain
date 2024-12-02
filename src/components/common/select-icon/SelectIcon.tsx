import { forwardRef } from 'react';
import Icon from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
import { IconItem } from 'types';

type ServerIconProps = {
  iconItems?: IconItem[];
  onChange?: (fileId: string) => void;
  size?: number;
  shape?: 'circle' | 'square';
  iconSize?: number;
  iconName?: string;
};
export type ServerIconRefProps = {};
const SelectIcon = forwardRef<ServerIconRefProps, ServerIconProps>(
  ({ size = 32, iconSize = 20, iconItems, onChange, iconName, ...props }, ref) => {
    const onSelectIconAvailable = (icon: IconItem) => {
      onChange?.(icon.key);
    };
    return (
      <div>
        <div className='flex w-full flex-wrap gap-4'>
          {iconItems?.map((iconItem) => (
            <div
              key={iconItem.key}
              className={twMerge(
                'hover:bg-backgroundColor3Light flex cursor-pointer items-center justify-center border bg-white text-colorTextBase transition-all',
                props.shape === 'circle' ? 'rounded-full' : 'rounded-base',
                iconName === iconItem.key && 'bg-backgroundColor3 text-white'
              )}
              onClick={() => onSelectIconAvailable(iconItem)}
              style={{
                width: size,
                height: size
              }}
            >
              <Icon
                component={iconItem.icon}
                style={{
                  fontSize: iconSize
                }}
                className='text-base transition-all'
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default SelectIcon;
