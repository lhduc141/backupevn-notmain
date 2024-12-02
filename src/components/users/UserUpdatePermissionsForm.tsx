import { Button, Form, FormInstance, Layout, List, Spin, TabsProps, Tooltip, Typography } from 'antd';
import { UserGroupFilledIcon } from 'assets';
import { TabButtons } from 'components/common';
import { FormItem } from 'components/common/form-item';
import { CheckboxPermissions } from 'components/permissions';
import { CheckboxRoles } from 'components/roles';
import { uniqBy } from 'lodash';
import { messages, permissionsMessages, rolesMessages, usersMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  useGetPermissionsOptionsQuery,
  useGetUserPermissionsQuery,
  useGetUserQuery,
  useLazyGetPermissionsOptionsQuery,
  useUpdateUserMutation
} from 'services';
import { PermissionCompactDto, RoleCompactDto } from 'types';

enum TABS {
  PERMISSIONS = 'permissions',
  ROLES = 'roles'
}

export type UserUpdatePermissionsFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onChangeSuccess?: () => void;
  userId?: number;
};

export type UserUpdatePermissionsFormRefProps = {
  form: FormInstance<UserUpdatePermissionsFormType>;
  isLoading: boolean;
};
export type UserUpdatePermissionsFormType = {
  permissions: PermissionCompactDto[];
  roles: RoleCompactDto[];
};
const UserUpdatePermissionsForm = forwardRef<UserUpdatePermissionsFormRefProps, UserUpdatePermissionsFormProps>(
  ({ userId, onChangeLoading, onChangeSuccess }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const { data: userInfoRes } = useGetUserQuery(userId!, {
      skip: !userId
    });
    const { data: userRes, isLoading } = useGetUserPermissionsQuery(userId!, {
      skip: !userId
    });
    const [getRolePermissions, { data: rolePermissionsRes }] = useLazyGetPermissionsOptionsQuery();

    const userInfo = userInfoRes?.data;
    const userPermissions = userRes?.data;
    const rolePermissions = rolePermissionsRes?.data.rows || [];
    const userGroupPermissions = userPermissions?.userGroup?.permissions || [];
    const userGroupPermissionIds = userGroupPermissions.map((p) => p.permissionId);
    const userGroupRoleIds = userPermissions?.userGroup?.roles.map((r) => r.roleId) || [];

    const { data: userGroupRolePermissionRes } = useGetPermissionsOptionsQuery(
      {
        isLoadAll: true,
        roleIds: userGroupRoleIds || [0]
      },
      {
        skip: !userGroupRoleIds || userGroupRoleIds.length === 0
      }
    );
    const userGroupRolePermissions = userGroupRolePermissionRes?.data.rows || [];
    const userGroupRolePermissionIds = userGroupRolePermissions.map((p) => p.permissionId);

    const [selectedTab, setSelectedTab] = useState<TABS>(TABS.ROLES);

    const [form] = Form.useForm<UserUpdatePermissionsFormType>();
    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
    const onFinish = (values: UserUpdatePermissionsFormType) => {
      if (!userId) return;
      onUpdate({
        userId,
        permissionIds: values.permissions.map((o) => o.permissionId),
        roleIds: values.roles.map((o) => o.roleId)
      })
        .unwrap()
        .then(() => {
          onChangeSuccess?.();
        });
    };
    useEffect(() => {
      if (userPermissions && userId) {
        form.setFieldsValue({
          permissions: userPermissions.permissions,
          roles: userPermissions.roles
        });
        if (userPermissions.roles && userPermissions.roles.length > 0) {
          getRolePermissions({
            isLoadAll: true,
            roleIds: userPermissions.roles.map((role) => role.roleId)
          });
        }
      }
    }, [userPermissions, userId]);

    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);

    const permissions: PermissionCompactDto[] = Form.useWatch('permissions', form) || [];
    const roles: RoleCompactDto[] = Form.useWatch('roles', form) || [];

    const handleChangePermissions = (value: PermissionCompactDto[]) => {
      form.setFieldValue('permissions', value);
    };

    const handleChangeRoles = (value: RoleCompactDto[]) => {
      form.setFieldValue('roles', value);
      getRolePermissions({
        isLoadAll: true,
        roleIds: value.length > 0 ? value.map((role) => role.roleId) : [0]
      });
    };

    const tabItems: TabsProps['items'] = [
      {
        key: TABS.ROLES,
        label: rolesMessages.title
      },
      {
        key: TABS.PERMISSIONS,
        label: permissionsMessages.title
      }
    ];

    const combinedPermissions = uniqBy(
      [...userGroupPermissions, ...userGroupRolePermissions, ...rolePermissions, ...permissions],
      'permissionId'
    );

    return (
      <Layout className='min-h-screen'>
        <Layout.Sider className='min-w-[340px] bg-colorBgBody px-6 pb-5 pt-16'>
          <Typography.Title level={4} className='mb-2 text-2.5xl'>
            {userInfo?.fullName}
          </Typography.Title>
          <Typography.Paragraph type='secondary' className='mb-0'>
            {userInfo?.email}
          </Typography.Paragraph>
          <Typography.Paragraph type='secondary' className='mb-8'>
            {userInfo?.organizationUnit?.name}
          </Typography.Paragraph>
          <Typography.Title level={5} className='mb-4 text-lg'>
            {usersMessages.grantPermissions}
          </Typography.Title>
          {combinedPermissions.length > 0 && (
            <List
              className='-mx-6 max-h-[calc(100vh-240px)] overflow-auto px-6'
              dataSource={combinedPermissions}
              rowKey={(item) => item.permissionId}
              split={false}
              renderItem={(item) => (
                <List.Item className='flex gap-x-2 py-[10px]'>
                  <Typography.Paragraph className='mb-0' ellipsis={{ rows: 1 }}>
                    {item.name}
                  </Typography.Paragraph>

                  {userGroupPermissionIds.includes(item.permissionId) ||
                  userGroupRolePermissionIds.includes(item.permissionId) ? (
                    <Tooltip
                      placement='topLeft'
                      arrow={{ pointAtCenter: true }}
                      title={
                        <Typography.Text className='text-xs text-colorTextContrast'>{`${usersMessages.permissionFromGroup} ${userPermissions?.userGroup?.name}`}</Typography.Text>
                      }
                    >
                      <UserGroupFilledIcon className='text-iconColor' />
                    </Tooltip>
                  ) : undefined}
                </List.Item>
              )}
            />
          )}
        </Layout.Sider>
        <Layout className='bg-colorBgContainer pt-16'>
          <div className='relative max-h-[calc(100vh-64px-8px)] overflow-y-auto px-6'>
            <Typography.Title className='mb-2 text-2.5xl'>{usersMessages.permissions}</Typography.Title>
            <Typography.Paragraph type='secondary' className='mb-6'>
              {messages.chooseOneOrMorePerrmission}
            </Typography.Paragraph>
            <Form
              scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
              requiredMark={false}
              form={form}
              name='userUpdatePermissionForm'
              onFinish={onFinish}
              layout='horizontal'
            >
              <Spin spinning={isLoading}>
                <FormItem<UserUpdatePermissionsFormType> name='permissions' noStyle />
                <FormItem<UserUpdatePermissionsFormType> name='roles' noStyle />
                <TabButtons
                  className='pb-4'
                  defaultActiveKey={TABS.PERMISSIONS}
                  items={tabItems}
                  onClick={(key) => setSelectedTab(key as TABS)}
                  activeKey={selectedTab}
                />
                {selectedTab === TABS.PERMISSIONS && (
                  <CheckboxPermissions
                    value={permissions}
                    onChange={handleChangePermissions}
                    organizationUnitIds={userInfo?.organizationUnitId ? [userInfo.organizationUnitId] : undefined}
                  />
                )}
                {selectedTab === TABS.ROLES && <CheckboxRoles value={roles} onChange={handleChangeRoles} />}
              </Spin>
            </Form>
            <div className='sticky bottom-0 -mx-6 mt-2 h-20 border-t bg-white px-6'>
              <Button
                onClick={() => form.submit()}
                className='float-right my-5'
                loading={isLoadingUpdate}
                type='primary'
              >
                {messages.saveButtonText}
              </Button>
            </div>
          </div>
        </Layout>
      </Layout>
    );
  }
);
export default UserUpdatePermissionsForm;
