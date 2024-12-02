import { Button, Form, FormProps, Input, Typography } from 'antd';
import { FormItem } from 'components';
import { loginMessages, messages, validateMessages } from 'messages';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from 'routes/constants';
import { useVerifyForgotPasswordMutation } from 'services';
import { VerifyForgotPasswordDto } from 'types';

const VerifyForgotPasswordPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Parse query string
  const email = params.get('email');

  const navigate = useNavigate();
  const [onVerify, { isLoading }] = useVerifyForgotPasswordMutation();
  const [form] = Form.useForm<VerifyForgotPasswordDto>();

  const onFinish: FormProps<VerifyForgotPasswordDto>['onFinish'] = (values) => {
    if (email)
      onVerify({
        ...values,
        email
      })
        .unwrap()
        .then((rs) => {
          if (rs.data.token) navigate(`${ROUTE.RESET_PASSWORD}?token=${rs.data.token}`);
        })
        .catch((err) => {
          form.setFields([
            {
              name: 'otp',
              errors: [err.message]
            }
          ]);
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
      <Typography.Title className='mb-[52px] text-center text-4xl font-bold'>{loginMessages.inputOtp}</Typography.Title>
      <Typography.Paragraph className='mb-6'>
        {loginMessages.inputOtpSubText} {email}
      </Typography.Paragraph>
      <FormItem.FloatLabel<VerifyForgotPasswordDto> name='otp' rules={[{ required: true }]} className='mb-10 w-full'>
        <Input.OTP autoFocus length={6} className='w-full' />
      </FormItem.FloatLabel>

      <FormItem.FloatLabel label={<div />}>
        <Button size='large' className='w-full' loading={isLoading} type='primary' htmlType='submit'>
          {messages.confirmButtonText}
        </Button>
      </FormItem.FloatLabel>
    </Form>
  );
};

export default VerifyForgotPasswordPage;
