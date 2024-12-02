import Icon from '@ant-design/icons';
import { Form, FormInstance, Typography } from 'antd';
import { CheckCircleIcon, RestrictedIcon } from 'assets';
import { RadioGroup } from 'components/common';
import { useOptions, useUpdateUser } from 'hooks';
import { usersMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useGetUserQuery } from 'services';
import { OptionCompactDto } from 'types';
import { AUTH_OPTION_TYPES, MICROSERVICES, USER_STATUS } from 'utils';
type UserChangeStatusFormType = {
  statusId: number;
};
export type UserChangeStatusFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onChangeSuccess?: () => void;
  userId: number;
};

export type UserChangeStatusFormRefProps = {
  form: FormInstance<UserChangeStatusFormType>;
  isLoading: boolean;
};
const UserChangeStatusForm = forwardRef<UserChangeStatusFormRefProps, UserChangeStatusFormProps>(
  ({ userId, onChangeLoading, onChangeSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate || isLoadingUser
    }));

    const [form] = Form.useForm();
    const { isLoading: isLoadingUser, data: user } = useGetUserQuery(userId);
    const { isLoading: isLoadingUpdate, onUpdateUserHandle } = useUpdateUser(userId);
    const { data } = useOptions({
      optionTypeId: AUTH_OPTION_TYPES.USER_STATUS,
      service: MICROSERVICES.AUTH
    });
    const onFinish = (values: UserChangeStatusFormType) => {
      onUpdateUserHandle(
        {
          statusId: values.statusId
        },
        onChangeSuccess
      );
    };
    const formatStatusOptions = (options: OptionCompactDto[]) => {
      return options.map((option) => ({
        label: option.name,
        value: option.optionId,
        icon: (
          <Icon
            className='text-[32px]'
            component={option.optionId === USER_STATUS.INACTIVE ? RestrictedIcon : CheckCircleIcon}
          />
        )
      }));
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);
    useEffect(() => {
      if (user?.data) {
        form.setFieldValue('statusId', user.data.statusId);
      }
    }, [user]);
    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '150px'
        }}
        requiredMark={false}
        form={form}
        name='userChangeStatusForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
      >
        <Typography.Title level={3} className='mb-2 text-[26px]'>
          {usersMessages.accountStatus}
        </Typography.Title>
        <Typography.Paragraph className='mb-8'>
          {usersMessages.user}: {user?.data.fullName}
        </Typography.Paragraph>
        <Form.Item name='statusId' className='mb-0'>
          <RadioGroup className='bg-white' options={formatStatusOptions(data)} />
        </Form.Item>
      </Form>
    );
  }
);
export default UserChangeStatusForm;
