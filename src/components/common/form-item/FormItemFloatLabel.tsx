import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { twMerge } from 'tailwind-merge';
import FloatLabel from '../FloatLabel';

export type FormItemFLoatLabel<T> = FormItemProps<T> & {
  children: React.ReactNode;
  className?: string;
  classFloatLabel?: string;
};
const FormItemFloatLabel = <T extends AnyObject>({
  noStyle,
  className,
  classFloatLabel,
  rules,
  ...props
}: FormItemFLoatLabel<T>) => {
  const hasRequired = rules?.some((rule) => typeof rule === 'object' && 'required' in rule && rule.required);
  return (
    <Form.Item rules={rules} noStyle={noStyle} className={className} prefixCls='float-label' {...props}>
      <FloatLabel
        className={twMerge(noStyle ? className : '', classFloatLabel, hasRequired && 'float-required')}
        label={props.label}
      >
        {props.children}
      </FloatLabel>
    </Form.Item>
  );
};
export default FormItemFloatLabel;
