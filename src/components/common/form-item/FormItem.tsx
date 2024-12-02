import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { twMerge } from 'tailwind-merge';

export type FormItem<T> = FormItemProps<T> & {
  className?: string;
  hiddenLabel?: boolean;
};
const FormItem = <T extends AnyObject>({ className, hiddenLabel, ...props }: FormItem<T>) => {
  return (
    <Form.Item className={twMerge(className, hiddenLabel && 'hidden-label')} {...props}>
      {props.children}
    </Form.Item>
  );
};
export default FormItem;
