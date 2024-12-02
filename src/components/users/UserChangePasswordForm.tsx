import { Form, FormInstance, Input } from 'antd';
import { FormItem } from 'components/common/form-item';
import { useUpdateUser } from 'hooks';
import { validateMessages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { PASSWORD_REG_EXP } from 'utils';
type UserChangePassFormType = {
  newPassword: string;
  confirmPassword: string;
};
export type UserChangePasswordFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onChangeSuccess?: () => void;
  userId: number;
};

export type UserChangePasswordFormRefProps = {
  form: FormInstance<UserChangePassFormType>;
  isLoading: boolean;
};
const UserChangePasswordForm = forwardRef<UserChangePasswordFormRefProps, UserChangePasswordFormProps>(
  ({ userId, onChangeLoading, onChangeSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const [form] = Form.useForm();
    const { isLoading: isLoadingUpdate, onUpdateUserHandle } = useUpdateUser(userId);
    const onFinish = (values: UserChangePassFormType) => {
      onUpdateUserHandle(
        {
          password: values.newPassword
        },
        onChangeSuccess
      );
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '150px'
        }}
        requiredMark={false}
        form={form}
        name='userChangePasswordForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
      >
        <FormItem.FloatLabel<UserChangePassFormType>
          name='newPassword'
          label={usersMessages.newPassword}
          rules={[{ required: true }, { pattern: PASSWORD_REG_EXP, message: usersMessages.passwordMismatchPatern }]}
          hasFeedback
        >
          <Input.Password />
        </FormItem.FloatLabel>

        {/* <FormItem.FloatLabel<UserChangePassFormType>
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
        </FormItem.FloatLabel> */}
      </Form>
    );
  }
);
export default UserChangePasswordForm;
