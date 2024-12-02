import { Button, Form, FormProps, Input, Typography } from 'antd';
import { FormItem } from 'components';
import { loginMessages, validateMessages } from 'messages';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useForgotPasswordMutation } from 'services';
import { ForgotPasswordDto } from 'types';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [onForgot, { isLoading }] = useForgotPasswordMutation();
  const [form] = Form.useForm<ForgotPasswordDto>();

  const onFinish: FormProps<ForgotPasswordDto>['onFinish'] = (values) => {
    onForgot(values)
      .unwrap()
      .then((rs) => {
        navigate(`${ROUTE.VERIFY_FORGOT_PASSWORD}?email=${values.email}`);
      });
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
        {loginMessages.forgotPassword}
      </Typography.Title>
      <Typography.Paragraph className='mb-6'>{loginMessages.forgotSubText}</Typography.Paragraph>
      <FormItem.FloatLabel<ForgotPasswordDto>
        label={loginMessages.email}
        name='email'
        rules={[{ required: true, type: 'email' }]}
        className='mb-10 w-full'
      >
        <Input />
      </FormItem.FloatLabel>

      <FormItem.FloatLabel label={<div />}>
        <Button size='large' className='w-full' loading={isLoading} type='primary' htmlType='submit'>
          {loginMessages.continueButtonText}
        </Button>
      </FormItem.FloatLabel>
    </Form>
  );
};

export default ForgotPasswordPage;
