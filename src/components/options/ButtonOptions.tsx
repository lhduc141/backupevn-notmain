import { useOptions } from 'hooks';
import { useOptionsDefault } from 'hooks/options/useOptionsDefault';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { FindAllOptionsDto } from 'types';

type ButtonOptionsProps = {
  value?: number;
  disabled?: boolean;
  onChange: (
    value: number,
    option: {
      label: string;
      value: number;
    }
  ) => void;
} & Pick<FindAllOptionsDto, 'optionTypeId' | 'service'>;

const ButtonOptions = ({ optionTypeId, service, value, disabled, ...props }: ButtonOptionsProps) => {
  const { data } = useOptions({
    optionTypeId,
    service
  });
  const { optionsDefault } = useOptionsDefault({
    optionTypeId,
    service
  });
  useEffect(() => {
    if (optionsDefault && optionsDefault.length > 0) {
      const itmDefault = optionsDefault[0];
      props.onChange?.(itmDefault.optionId, {
        label: itmDefault.name,
        value: itmDefault.optionId
      });
    }
  }, [optionsDefault]);
  return (
    <div className='flex gap-2'>
      {data.map((option) => (
        <div
          className={twMerge(
            'flex h-9 min-w-[112px] cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-center transition-all',
            value === option.optionId && 'border-none bg-colorTextLabel text-white',
            disabled && 'opacity-70'
          )}
          onClick={() =>
            !disabled &&
            props.onChange(option.optionId, {
              label: option.name,
              value: option.optionId
            })
          }
        >
          <span className={twMerge('text-center text-sm font-semibold')}>{option.name}</span>
        </div>
      ))}
    </div>
  );
};
export default ButtonOptions;
