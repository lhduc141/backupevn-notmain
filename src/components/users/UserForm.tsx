import { Divider, Form, FormInstance, Input, Space, Spin, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { message } from 'components/common';
import { FormItem } from 'components/common/form-item';
import { SelectOptions } from 'components/options';
import { SelectOrganizationUnits } from 'components/organization-units';
import { SelectUserGroups } from 'components/user-groups';
import { userGroupsMessages, validateMessages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateUserMutation, useGetUserQuery, useUpdateUserMutation } from 'services';
import { CreateUserDto, UserDto } from 'types';
import { AUTH_OPTION_TYPES, MICROSERVICES } from 'utils';
import { createUserInitialValues, updateUserInitialValues } from 'utils/initial-values';
import { userUpdateValidationRules, userValidationRules } from 'utils/validation-rules';
export type UserFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onSubmitSuccess?: (user?: UserDto) => void;
  userId?: number;
};

export type UserFormRefProps = {
  form: FormInstance<UserFormType>;
  isLoading: boolean;
};

export type UserFormType = Omit<CreateUserDto, 'userGroupId' | 'organizationUnitId'> & {
  organizationUnitId: DefaultOptionType;
  userGroupId?: DefaultOptionType;
};
const UserForm = forwardRef<UserFormRefProps, UserFormProps>(({ onChangeLoading, onSubmitSuccess, userId }, ref) => {
  useImperativeHandle(ref, () => ({
    form: form,
    isLoading: isLoadingCreate || isLoadingUpdate
  }));
  const [onCreate, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();

  const { data: user, isLoading: isLoadingDetail } = useGetUserQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true
  });

  const [form] = Form.useForm<UserFormType>();
  const organizationUnitId = Form.useWatch('organizationUnitId', form);
  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(isLoadingCreate || isLoadingUpdate);
    }
  }, [onChangeLoading, isLoadingCreate, isLoadingUpdate]);

  useEffect(() => {
    if (user && userId) {
      form.setFieldsValue({
        ...user.data,
        organizationUnitId: user.data.organizationUnit
          ? {
              label: user.data.organizationUnit?.name,
              value: user.data.organizationUnitId
            }
          : undefined,
        userGroupId: user.data.userGroup
          ? {
              label: user.data.userGroup?.name,
              value: user.data.userGroupId
            }
          : undefined
      });
    }
  }, [user, userId]);

  const onFinish = ({ ...values }: UserFormType) => {
    const data: CreateUserDto = {
      ...values,
      organizationUnitId: values.organizationUnitId.value as number,
      userGroupId: values.userGroupId === null ? null : (values.userGroupId?.value as number)
    };
    if (!userId) {
      onCreate(data)
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onSubmitSuccess?.(rs.data);
        });
    } else {
      onUpdate({
        userId,
        ...data
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onSubmitSuccess?.();
        });
    }
  };

  const validationRules = userId ? userUpdateValidationRules : userValidationRules;

  return (
    <Form
      scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
      labelAlign='right'
      labelCol={{
        flex: '180px'
      }}
      form={form}
      name='userForm'
      onFinish={onFinish}
      layout='horizontal'
      validateMessages={validateMessages}
      initialValues={userId ? updateUserInitialValues : createUserInitialValues}
    >
      <Spin spinning={isLoadingCreate || isLoadingUpdate || isLoadingDetail}>
        <>
          <Typography.Title level={5} className='mb-5 text-lg'>
            {usersMessages.personalInfo}
          </Typography.Title>
          <Space.Compact direction='vertical' className='w-full'>
            <FormItem.FloatLabel<UserFormType>
              name='fullName'
              label={usersMessages.fullName}
              rules={validationRules.fullName}
            >
              <Input />
            </FormItem.FloatLabel>
            <Space.Compact direction='horizontal' className='w-[calc(100%-1px)]'>
              <FormItem.FloatLabel<UserFormType>
                label={usersMessages.email}
                rules={validationRules.email}
                name='email'
                className='flex-1'
              >
                <Input />
              </FormItem.FloatLabel>

              <FormItem.FloatLabel<UserFormType>
                name='phoneNumber'
                label={usersMessages.phoneNumber}
                rules={validationRules.phoneNumber}
                className='flex-1'
              >
                <Input />
              </FormItem.FloatLabel>
            </Space.Compact>
            <FormItem.FloatLabel<UserFormType>
              name='genderId'
              label={usersMessages.gender}
              rules={validationRules.genderId}
            >
              <SelectOptions showSearch={false} service={MICROSERVICES.AUTH} optionTypeId={AUTH_OPTION_TYPES.GENDER} />
            </FormItem.FloatLabel>
          </Space.Compact>
          <FormItem.FloatLabel<UserFormType>
            name='employeeId'
            label={usersMessages.employeeId}
            rules={validationRules.employeeId}
            classFloatLabel='mt-4'
          >
            <Input />
          </FormItem.FloatLabel>
          <FormItem.FloatLabel<UserFormType>
            name='shortName'
            label={usersMessages.shortName}
            rules={validationRules.shortName}
          >
            <Input />
          </FormItem.FloatLabel>
          <Divider className='mt-4' />
        </>

        <>
          <Typography.Title level={5} className='mb-5 text-lg'>
            {usersMessages.loginInfo}
          </Typography.Title>
          {!userId ? (
            <>
              <input type='text' name='username' className='absolute left-[-99999px]' />
              <input type='password' className='absolute left-[-99999px]' />
              <Space.Compact direction='vertical' className='w-full'>
                <FormItem.FloatLabel<UserFormType>
                  name='username'
                  label={usersMessages.username}
                  rules={validationRules.username}
                >
                  <Input />
                </FormItem.FloatLabel>

                <FormItem.FloatLabel<UserFormType>
                  name='password'
                  label={usersMessages.newPassword}
                  rules={validationRules.password}
                >
                  <Input.Password />
                </FormItem.FloatLabel>
              </Space.Compact>
            </>
          ) : (
            <FormItem.FloatLabel<UserFormType>
              name='username'
              label={usersMessages.username}
              rules={validationRules.username}
            >
              <Input />
            </FormItem.FloatLabel>
          )}
          <Divider className='mt-4' />
        </>

        <>
          <Typography.Title level={5} className='mb-5 text-lg'>
            {usersMessages.organizationUnit}
          </Typography.Title>
          <FormItem.FloatLabel<UserFormType>
            name='organizationUnitId'
            label={usersMessages.unit}
            rules={validationRules.organizationUnitId}
          >
            <SelectOrganizationUnits
              labelInValue
              onSelect={(value: DefaultOptionType) => {
                if (organizationUnitId?.value !== value.value) form.setFieldValue('userGroupId', null);
              }}
            />
          </FormItem.FloatLabel>
          <Divider className='mt-4' />
        </>

        <>
          <Typography.Title level={5} className='text-lg'>
            {usersMessages.group}
          </Typography.Title>
          {organizationUnitId ? (
            <FormItem.FloatLabel<UserFormType>
              name='userGroupId'
              label={userGroupsMessages.title}
              rules={validationRules.userGroupId}
              className='mt-5'
            >
              <SelectUserGroups
                allowClear
                disabled={!organizationUnitId}
                organizationUnitId={organizationUnitId?.value ? [Number(organizationUnitId.value)] : undefined}
                labelInValue
              />
            </FormItem.FloatLabel>
          ) : (
            <Typography.Text type='secondary' className='mt-2'>
              {usersMessages.chooseOrganizationUnitFirts}
            </Typography.Text>
          )}
        </>
      </Spin>
    </Form>
  );
});
export default UserForm;
