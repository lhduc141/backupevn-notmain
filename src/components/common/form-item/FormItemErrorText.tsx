import { Form, FormInstance, Typography } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { NamePath } from 'antd/es/form/interface';
import { twMerge } from 'tailwind-merge';

type FormItemErrorTextProps<T> = {
  form: FormInstance;
  fieldsName: NamePath<T>[];
  className?: string;
};
const FormItemErrorText = <T extends AnyObject>({ fieldsName, form, className }: FormItemErrorTextProps<T>) => {
  return (
    <Form.Item noStyle shouldUpdate>
      {() => {
        const errors = form.getFieldsError(fieldsName);
        const errorsString = errors
          .flatMap((error) => error.errors) // Flatten the errors array
          .join(', ');
        return (
          <div className={twMerge(className, 'transition-all', errorsString.length ? 'min-h-4 pt-2' : 'min-h-0 pt-0')}>
            {errorsString.length > 0 ? (
              <Typography.Text type='danger' className='text-xs'>
                {errorsString}
              </Typography.Text>
            ) : null}
          </div>
        );
      }}
    </Form.Item>
  );
};
export default FormItemErrorText;
