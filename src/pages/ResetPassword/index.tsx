import { Button, Form, FormProps, Input, Space, Typography } from 'antd';
import { FormItem, message } from 'components';
import { loginMessages, messages, rulesMessages, validateMessages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useResetPasswordMutation } from 'services';
import { PASSWORD_REG_EXP } from 'utils';
type FormType = {
  password: string;
  confirmPassword: string;
};
const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const [visiblePass, setVisiblePass] = useState(false);

  const navigate = useNavigate();
  const [onForgot, { isLoading }] = useResetPasswordMutation();
  const [form] = Form.useForm<FormType>();

  const onFinish: FormProps<FormType>['onFinish'] = (values) => {
    if (token) {
      onForgot({
        password: values.password,
        token: token
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          navigate(`${ROUTE.LOGIN}`);
        });
    }
  };
  return (
    <Form
      scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete='off'
      validateMessages={validateMessages}
      requiredMark={false}
      className='w-full'
      wrapperCol={{ flex: 'auto' }}
      form={form}
    >
      <Typography.Title className='mb-[52px] text-center text-4xl font-bold'>
        {loginMessages.resetPassword}
      </Typography.Title>
      <div className='relative mb-6'>
        <Space.Compact direction='vertical' className='w-full'>
          <FormItem.FloatLabel<FormType>
            name='password'
            label={usersMessages.newPassword}
            rules={[{ required: true }, { pattern: PASSWORD_REG_EXP, message: usersMessages.passwordMismatchPatern }]}
            hasFeedback
            noStyle
          >
            <Input.Password
              visibilityToggle={{
                visible: visiblePass
              }}
              iconRender={() => null}
            />
          </FormItem.FloatLabel>

          <FormItem.FloatLabel<FormType>
            name='confirmPassword'
            label={usersMessages.confirmPassword}
            dependencies={['password']}
            hasFeedback
            noStyle
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(rulesMessages.passwordsNotMatch));
                }
              })
            ]}
          >
            <Input.Password
              visibilityToggle={{
                visible: visiblePass
              }}
              iconRender={() => null}
            />
          </FormItem.FloatLabel>
        </Space.Compact>
        <FormItem.ErrorText<FormType> fieldsName={['password']} form={form} />
      </div>
      <div className='mb-10 flex w-full justify-end'>
        <Button
          type='link'
          onClick={() => {
            setVisiblePass(!visiblePass);
          }}
        >
          {visiblePass ? loginMessages.hidePassword : loginMessages.showPassword}
        </Button>
      </div>

      <FormItem.FloatLabel label={<div />}>
        <Button size='large' className='w-full' loading={isLoading} type='primary' htmlType='submit'>
          {messages.confirmButtonText}
        </Button>
      </FormItem.FloatLabel>
    </Form>
  );
};

export default ResetPasswordPage;
