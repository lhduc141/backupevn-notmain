import { Button, Checkbox, Form, FormProps, Input, Space, Typography } from 'antd';
import { FormItem } from 'components';
import { useLogin } from 'hooks/auth/useLogin';
import { loginMessages, messages, validateMessages } from 'messages';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { LoginDto } from 'types';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm<LoginDto>();

  const { onLoginHandle, isLoading } = useLogin();
  const onFinish: FormProps<LoginDto>['onFinish'] = (values) => {
    onLoginHandle(values);
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
      <Typography.Title className='mb-[60px] text-center text-4xl font-bold'>{messages.appName}</Typography.Title>
      <input type='text' name='username' className='absolute left-[-99999px]' />
      <input type='password' className='absolute left-[-99999px]' />
      <div className='relative mb-4'>
        <Space.Compact direction='vertical' className='relative w-full'>
          <FormItem.FloatLabel<LoginDto>
            label={loginMessages.userName}
            name='username'
            rules={[{ required: true }]}
            className='w-full'
            noStyle
          >
            <Input autoComplete='off' />
          </FormItem.FloatLabel>

          <FormItem.FloatLabel<LoginDto>
            label={loginMessages.password}
            name='password'
            className='w-full'
            noStyle
            rules={[{ required: true }]}
          >
            <Input.Password />
          </FormItem.FloatLabel>
        </Space.Compact>
        <FormItem.ErrorText<LoginDto> fieldsName={['username', 'password']} form={form} />
      </div>

      <FormItem.FloatLabel<LoginDto> className='mb-10' name='isADAccount' valuePropName='checked' label={<div />}>
        <Checkbox>{loginMessages.isADAccount}</Checkbox>
      </FormItem.FloatLabel>

      <FormItem.FloatLabel label={<div />}>
        <Button size='large' className='w-full' loading={isLoading} type='primary' htmlType='submit'>
          {loginMessages.loginButtonText}
        </Button>
      </FormItem.FloatLabel>

      <Link to={ROUTE.FORGOT_PASSWORD}>
        <Button size='large' className='m-0 w-full p-0' type='link'>
          {loginMessages.forgotPassword}
        </Button>
      </Link>
    </Form>
  );
};

export default LoginPage;
