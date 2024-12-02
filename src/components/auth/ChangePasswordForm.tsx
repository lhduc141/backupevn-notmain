import { Form, FormInstance, Input } from 'antd';
import { FormItem, message } from 'components/common';
import { rulesMessages, validateMessages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useChangePasswordMutation } from 'services';
import { ChangePasswordDto } from 'types';
import { PASSWORD_REG_EXP } from 'utils';
export type ChangePasswordFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onChangeSuccess?: () => void;
};
export type ChangePasswordFormRefProps = {
  form: FormInstance<
    ChangePasswordDto & {
      confirmPassword: string;
    }
  >;
  isLoading: boolean;
};
const ChangePasswordForm = forwardRef<ChangePasswordFormRefProps, ChangePasswordFormProps>(
  ({ onChangeLoading, onChangeSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoading
    }));

    const [form] = Form.useForm();
    const [changePass, { isLoading }] = useChangePasswordMutation();
    const onFinish = (
      values: ChangePasswordDto & {
        confirmPassword: string;
      }
    ) => {
      changePass({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onChangeSuccess?.();
        })
        .catch((err) => console.error(err));
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoading);
      }
    }, [onChangeLoading, isLoading]);
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '150px'
        }}
        requiredMark={false}
        form={form}
        name='changePassword'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
      >
        <FormItem.FloatLabel name='currentPassword' label={usersMessages.currentPassword} rules={[{ required: true }]}>
          <Input.Password />
        </FormItem.FloatLabel>

        <FormItem.FloatLabel
          name='newPassword'
          label={usersMessages.newPassword}
          rules={[{ required: true }, { pattern: PASSWORD_REG_EXP, message: usersMessages.passwordMismatchPatern }]}
          hasFeedback
        >
          <Input.Password />
        </FormItem.FloatLabel>

        <FormItem.FloatLabel
          name='confirmPassword'
          label={usersMessages.confirmPassword}
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(rulesMessages.passwordsNotMatch));
              }
            })
          ]}
        >
          <Input.Password />
        </FormItem.FloatLabel>
      </Form>
    );
  }
);
export default ChangePasswordForm;
