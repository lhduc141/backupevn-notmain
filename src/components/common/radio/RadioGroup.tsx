import { Radio, Typography } from 'antd';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  options: {
    label: string;
    value: string | number | boolean;
    description?: string;
    icon: React.JSX.Element;
    disabled?: boolean;
  }[];
  value?: string | number;
  onChange?: (value: string | number | boolean) => void;
  className?: string;
};

const RadioGroup = ({ options, onChange, value, className }: Props) => {
  return (
    <div className={'flex flex-col'}>
      <Radio.Group
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
      >
        {options.map((option, index) => (
          <div
            key={option.value.toString()}
            className={twMerge(
              'flex min-h-[74px] border px-4 py-[18px] transition-all',
              index === 0 ? 'rounded-t-xl' : index === options.length - 1 ? 'rounded-b-xl' : 'rounded-none',
              value === option.value ? 'border-mainColor1' : 'border-neutral4',
              option.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              className
            )}
            onClick={() => {
              if (onChange && !option.disabled) onChange(option.value);
            }}
          >
            <div className={'flex w-full items-start justify-between'}>
              <div className={'flex items-center gap-x-4'}>
                {option.icon}
                <div className={'flex flex-col gap-1'}>
                  <Typography.Title level={5} className='mb-0'>
                    {option.label}
                  </Typography.Title>
                  {option.description && (
                    <Typography.Text className={'text-neutral7 mt-2 text-[14px] leading-[17px]'}>
                      {option.description}
                    </Typography.Text>
                  )}
                </div>
              </div>
            </div>
            <Radio value={option.value} disabled={option.disabled} />
          </div>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioGroup;
