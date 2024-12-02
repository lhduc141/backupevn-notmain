import { Divider, Form, FormInstance, Input, Spin, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { FormItem, message } from 'components/common';
import { SelectOrganizationUnits } from 'components/organization-units';
import { validateMessages } from 'messages';
import { userGroupsMessages } from 'messages/user-groups.messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  useCreateUserGroupMutation,
  useGetUserGroupDetailQuery,
  useUpdateUserGroupMutation
} from 'services/user-groups';
import { CreateUserGroupDto, UserCompactDto, UserGroupDto } from 'types';
import { userGroupsValidationRules } from 'utils/validation-rules/user-groups.validation-rules';
import UpdateUserList from './UpdateUserList';
import { RadioOptions } from 'components/options';
import { AUTH_OPTION_TYPES, MICROSERVICES } from 'utils';
export type UserGroupFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onSubmitSuccess?: (userGroup?: UserGroupDto) => void;
  userGroupId?: number;
};

export type UserGroupFormRefProps = {
  form: FormInstance<UserGroupFormType>;
  isLoading: boolean;
};

export type UserGroupFormType = Omit<
  CreateUserGroupDto,
  'permissionIds' | 'organizationUnitId' | 'roleIds' | 'userIds'
> & {
  organizationUnitId: DefaultOptionType;
  permissionIds?: DefaultOptionType[];
  roleIds?: DefaultOptionType[];
  userIds?: UserCompactDto[];
};
const UserGroupForm = forwardRef<UserGroupFormRefProps, UserGroupFormProps>(
  ({ onChangeLoading, onSubmitSuccess, userGroupId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingCreate || isLoadingUpdate
    }));

    const [form] = Form.useForm<UserGroupFormType>();
    const organizationUnitId = Form.useWatch('organizationUnitId', form);
    const userIds: UserCompactDto[] = Form.useWatch('userIds', form) || [];
    const handleRemove = (record: UserCompactDto) => {
      form.setFieldValue(
        'userIds',
        userIds.filter((o) => o.userId !== record.userId)
      );
    };

    const handleAdd = (record: DefaultOptionType & UserCompactDto) => {
      form.setFieldValue('userIds', [
        {
          userId: record.userId,
          fullName: record.fullName,
          shortName: record.shortName,
          avatar: record.avatar
        },
        ...userIds.filter((o) => o.userId !== record.userId)
      ]);
    };

    const { data: userGroup, isLoading: isLoadingDetail } = useGetUserGroupDetailQuery(userGroupId!, {
      skip: !userGroupId,
      refetchOnMountOrArgChange: true
    });

    const [onCreate, { isLoading: isLoadingCreate }] = useCreateUserGroupMutation();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateUserGroupMutation();

    useEffect(() => {
      if (userGroup && userGroupId) {
        form.setFieldsValue({
          ...userGroup.data,
          roleIds: userGroup.data.roles?.map((o) => ({ value: o.roleId, label: o.name })),
          permissionIds: userGroup.data.permissions?.map((o) => ({ value: o.permissionId, label: o.name })),
          organizationUnitId: userGroup.data.organizationUnit
            ? {
                label: userGroup.data.organizationUnit?.name,
                value: userGroup.data.organizationUnitId
              }
            : undefined
        });
      }
    }, [userGroup, userGroupId]);

    const onFinish = ({ ...values }: UserGroupFormType) => {
      const data: CreateUserGroupDto = {
        ...values,
        organizationUnitId: values.organizationUnitId.value as number,
        permissionIds: values.permissionIds?.map((o) => o.value as number),
        roleIds: values.roleIds?.map((o) => o.value as number),
        userIds: values.userIds?.map((u) => u.userId)
      };
      if (!userGroupId) {
        onCreate(data)
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onSubmitSuccess?.(rs.data);
          });
      } else {
        onUpdate({
          userGroupId,
          ...data
        })
          .unwrap()
          .then((rs) => {
            message.systemSuccess(rs.message);
            onSubmitSuccess?.();
          });
      }
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingCreate || isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingCreate, isLoadingUpdate]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='userGroupInfoForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
      >
        <Spin spinning={isLoadingDetail || isLoadingCreate || isLoadingUpdate}>
          <Typography.Title level={5} className='mb-5 text-lg'>
            {userGroupsMessages.general}
          </Typography.Title>
          <FormItem.FloatLabel<UserGroupFormType>
            label={userGroupsMessages.userGroupName}
            name='name'
            rules={userGroupsValidationRules.name}
          >
            <Input />
          </FormItem.FloatLabel>

          <FormItem.FloatLabel<UserGroupFormType>
            label={userGroupsMessages.organizationUnit}
            name='organizationUnitId'
            rules={userGroupsValidationRules.organizationUnitId}
          >
            <SelectOrganizationUnits
              labelInValue
              disabled={!!userGroupId}
              onSelect={(value) => {
                form.setFieldsValue({
                  userIds: undefined,
                  organizationUnitId: value
                });
              }}
            />
          </FormItem.FloatLabel>

          <Divider className='mt-4' />

          <Typography.Title level={5} className='mb-5 text-lg'>
            {userGroupsMessages.classify}
          </Typography.Title>
          <Form.Item<UserGroupFormType>
            rules={userGroupsValidationRules.userGroupClassifyId}
            name='userGroupClassifyId'
            label={userGroupsMessages.classify}
            noStyle
          >
            <RadioOptions service={MICROSERVICES.AUTH} optionTypeId={AUTH_OPTION_TYPES.USER_GROUP_CLASSIFY} />
          </Form.Item>
          <FormItem.ErrorText<UserGroupFormType> fieldsName={['userGroupClassifyId']} form={form} />

          {!userGroupId && (
            <>
              <Divider className='mt-4' />
              <Typography.Title level={5} className='mb-5 text-lg'>
                {userGroupsMessages.users}
              </Typography.Title>
              {organizationUnitId ? (
                <>
                  <FormItem<UserGroupFormType> name='userIds' noStyle />
                  <UpdateUserList
                    users={userIds}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    organizationUnitId={organizationUnitId.value ? [organizationUnitId.value as number] : undefined}
                  />
                </>
              ) : (
                <Typography.Text type='secondary' className='mt-2'>
                  {userGroupsMessages.chooseOrganizationUnitFirts}
                </Typography.Text>
              )}
            </>
          )}
        </Spin>
      </Form>
    );
  }
);
export default UserGroupForm;
