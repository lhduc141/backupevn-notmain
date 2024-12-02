import { Button, Form, FormInstance, Layout, List, Spin, TabsProps, Typography } from 'antd';
import { CheckboxRoles, CheckboxPermissions } from 'components';
import { TabButtons } from 'components/common';
import { FormItem } from 'components/common/form-item';
import { uniqBy } from 'lodash';
import { messages, permissionsMessages, rolesMessages, userGroupsMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useGetUserGroupDetailQuery, useLazyGetPermissionsOptionsQuery, useUpdateUserGroupMutation } from 'services';
import { PermissionCompactDto, RoleCompactDto } from 'types';

export type UserGroupUpdatePermissionsFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onChangeSuccess?: () => void;
  userGroupId?: number;
};

export type UserGroupUpdatePermissionsFormRefProps = {
  form: FormInstance<UserGroupUpdatePermissionsFormType>;
  isLoading: boolean;
};
export type UserGroupUpdatePermissionsFormType = {
  permissions: PermissionCompactDto[];
  roles: RoleCompactDto[];
};

enum TABS {
  PERMISSIONS = 'permissions',
  ROLES = 'roles'
}
const UserGroupUpdatePermissionsForm = forwardRef<
  UserGroupUpdatePermissionsFormRefProps,
  UserGroupUpdatePermissionsFormProps
>(({ userGroupId, onChangeLoading, onChangeSuccess }, ref) => {
  useImperativeHandle(ref, () => ({
    form: form,
    isLoading: isLoadingUpdate
  }));

  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.ROLES);

  const [form] = Form.useForm<UserGroupUpdatePermissionsFormType>();
  const roles: RoleCompactDto[] = Form.useWatch('roles', form) || [];
  const permissions: PermissionCompactDto[] = Form.useWatch('permissions', form) || [];

  const { data: userGroupRes, isLoading } = useGetUserGroupDetailQuery(userGroupId!, {
    skip: !userGroupId
  });
  const [getRolePermissions, { data: rolePermissionsRes }] = useLazyGetPermissionsOptionsQuery();
  const userGroup = userGroupRes?.data;
  const rolePermissions = rolePermissionsRes?.data.rows || [];
  const combinedPermissions = uniqBy([...rolePermissions, ...permissions], 'permissionId');

  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateUserGroupMutation();
  const onFinish = (values: UserGroupUpdatePermissionsFormType) => {
    if (!userGroupId) return;
    onUpdate({
      userGroupId,
      permissionIds: values.permissions.map((o) => o.permissionId),
      roleIds: values.roles.map((o) => o.roleId)
    })
      .unwrap()
      .then(() => {
        onChangeSuccess?.();
      });
  };
  useEffect(() => {
    if (userGroup && userGroupId) {
      form.setFieldsValue({
        permissions: userGroup.permissions,
        roles: userGroup.roles
      });
      if (userGroup.roles && userGroup.roles.length > 0) {
        getRolePermissions({
          isLoadAll: true,
          roleIds: userGroup.roles.map((role) => role.roleId)
        });
      }
    }
  }, [userGroup, userGroupId]);

  useEffect(() => {
    if (onChangeLoading) {
      onChangeLoading(isLoadingUpdate);
    }
  }, [onChangeLoading, isLoadingUpdate]);

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

  return (
    <Layout className='min-h-screen'>
      <Layout.Sider className='min-w-[340px] bg-colorBgBody px-6 pb-5 pt-16'>
        <Typography.Title level={4} className='mb-2 text-2.5xl'>
          {userGroup?.name}
        </Typography.Title>
        <Typography.Paragraph type='secondary' className='mb-0'>
          {userGroup?.userGroupClassify?.name}
        </Typography.Paragraph>
        <Typography.Paragraph type='secondary' className='mb-8'>
          {userGroup?.organizationUnit?.name}
        </Typography.Paragraph>
        <Typography.Title level={5} className='mb-4 text-lg'>
          {userGroupsMessages.grantPermissions}
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
              </List.Item>
            )}
          />
        )}
      </Layout.Sider>
      <Layout className='bg-colorBgContainer pt-16'>
        <div className='relative max-h-[calc(100vh-64px-8px)] overflow-y-auto px-6'>
          <Typography.Title className='mb-2 text-2.5xl'>{userGroupsMessages.permissions}</Typography.Title>
          <Typography.Paragraph type='secondary' className='mb-6'>
            {messages.chooseOneOrMorePerrmission}
          </Typography.Paragraph>
          <Form
            scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
            labelAlign='right'
            labelCol={{
              flex: '150px'
            }}
            requiredMark={false}
            form={form}
            name='resetPassword'
            onFinish={onFinish}
            layout='horizontal'
          >
            <Spin spinning={isLoading}>
              <FormItem<UserGroupUpdatePermissionsFormType> name='permissions' noStyle />
              <FormItem<UserGroupUpdatePermissionsFormType> name='roles' noStyle />
              <TabButtons
                className='pb-4'
                defaultActiveKey={TABS.PERMISSIONS}
                items={tabItems}
                onClick={(key) => setSelectedTab(key as TABS)}
                activeKey={selectedTab}
              />
              {selectedTab === TABS.PERMISSIONS && (
                <>
                  <CheckboxPermissions
                    value={permissions}
                    onChange={handleChangePermissions}
                    organizationUnitIds={userGroup?.organizationUnitId ? [userGroup.organizationUnitId] : undefined}
                  />
                </>
              )}
              {selectedTab === TABS.ROLES && (
                <>
                  <CheckboxRoles value={roles} onChange={handleChangeRoles} />
                </>
              )}
            </Spin>
          </Form>
          <div className='sticky bottom-0 -mx-6 mt-2 h-20 border-t bg-white px-6'>
            <Button onClick={() => form.submit()} className='float-right my-5' loading={isLoadingUpdate} type='primary'>
              {messages.saveButtonText}
            </Button>
          </div>
        </div>
      </Layout>
    </Layout>
  );
});
export default UserGroupUpdatePermissionsForm;
