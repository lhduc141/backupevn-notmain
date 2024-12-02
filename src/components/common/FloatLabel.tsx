import { Dayjs } from 'dayjs';
import React, { ChangeEvent, PropsWithChildren, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  label?: string | any;
  value?: string | number | Dayjs | null;
  className?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  isHasValue?: boolean;
};
const FloatLabel = ({ children, label, className, isHasValue, ...props }: PropsWithChildren & Props) => {
  const [focus, setFocus] = useState(false);
  const childProps = { ...props, placeholder: '' };
  const labelClass =
    isHasValue || focus || ((props.value || props.value === 0) && props.value.toString().length !== 0)
      ? 'label label-float'
      : 'label';
  const childrenWithProps = React.Children.map(children, (child) => {
    /** Kiểm tra isValidElement là cách an toàn và cũng tránh được lỗi TypeScript. */
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...childProps });
    }
    return child;
  });

  return (
    <div
      className={twMerge(`float-label ${className}`, !label && 'no-label')}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {childrenWithProps}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
