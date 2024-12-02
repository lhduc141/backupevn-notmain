import { Button, Divider, Form, FormInstance, Input, Layout, List, Skeleton, Typography } from 'antd';
import { FormItem, message } from 'components/common';
import { CheckboxPermissions } from 'components/permissions';
import { messages, rolesMessages, validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useCreateRoleMutation, useGetRoleDetailQuery, useUpdateRoleMutation } from 'services';
import { CreateRoleDto, PermissionCompactDto } from 'types';
import { createRoleInitialValues, roleValidationRules, updateRoleInitialValues } from 'utils';
export type RoleFormProps = {
  onCreateSuccess?: () => void;
  roleId?: number;
};

export type RoleFormRefProps = {
  form: FormInstance<RoleFormType>;
  isLoading: boolean;
};

export type RoleFormType = Omit<CreateRoleDto, 'permissionIds'> & {
  permissionIds: PermissionCompactDto[];
};
const RoleForm = forwardRef<RoleFormRefProps, RoleFormProps>(({ onCreateSuccess, roleId }, ref) => {
  useImperativeHandle(ref, () => ({
    form: form,
    isLoading: isLoadingCreate || isLoadingUpdate
  }));

  const [form] = Form.useForm<RoleFormType>();
  const permissions = Form.useWatch('permissionIds', form) ?? [];

  const { data: role, isLoading: isLoadingDetail } = useGetRoleDetailQuery(roleId!, {
    skip: !roleId,
    refetchOnMountOrArgChange: true
  });

  const [onCreate, { isLoading: isLoadingCreate }] = useCreateRoleMutation();
  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateRoleMutation();

  useEffect(() => {
    if (role && roleId) {
      form.setFieldsValue({
        ...role.data,
        permissionIds: role.data?.permissions
      });
    }
  }, [role, roleId]);

  const onFinish = (values: RoleFormType) => {
    const data: CreateRoleDto = {
      ...values,
      permissionIds: values.permissionIds.map((o) => o.permissionId)
    };
    if (!roleId) {
      onCreate(data)
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onCreateSuccess?.();
        });
    } else {
      onUpdate({
        roleId,
        ...data
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onCreateSuccess?.();
        });
    }
  };

  return (
    <Layout className='min-h-screen'>
      <Layout.Sider className='min-w-[340px] bg-colorBgBody px-6 pb-5 pt-16'>
        <Typography.Paragraph className='mb-4 font-semibold'>{rolesMessages.rolePermissions}</Typography.Paragraph>
        {permissions && permissions.length > 0 && (
          <List
            className='max-h-[calc(100vh-120px)] overflow-auto'
            dataSource={permissions}
            rowKey={(item) => item.permissionId}
            split={false}
            renderItem={(item) => <List.Item className='py-[10px]'>{item.name}</List.Item>}
          />
        )}
      </Layout.Sider>
      <Layout className='bg-colorBgContainer pt-16'>
        <div className='relative max-h-[calc(100vh-64px-8px)] overflow-y-auto px-6'>
          <Typography.Title className='mb-6 text-2.5xl'>
            {roleId ? rolesMessages.update : rolesMessages.create}
          </Typography.Title>
          <Form
            scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
            labelAlign='right'
            labelCol={{
              flex: '180px'
            }}
            requiredMark={false}
            form={form}
            name='roleForm'
            onFinish={onFinish}
            layout='horizontal'
            validateMessages={validateMessages}
            initialValues={roleId ? updateRoleInitialValues : createRoleInitialValues}
          >
            <Skeleton loading={isLoadingDetail}>
              <Typography.Title className='mb-5 text-lg'>{rolesMessages.general}</Typography.Title>
              <FormItem.FloatLabel<RoleFormType>
                required
                label={rolesMessages.name}
                name='name'
                rules={roleValidationRules.name}
              >
                <Input />
              </FormItem.FloatLabel>
              <FormItem.FloatLabel<RoleFormType>
                label={rolesMessages.description}
                name='description'
                rules={roleValidationRules.description}
              >
                <Input.TextArea className='h-[106px] resize-none' />
              </FormItem.FloatLabel>
              <Divider className='mb-8 mt-5' />
              <Typography.Title className='mb-5 text-lg'>{rolesMessages.editPermission}</Typography.Title>
              <CheckboxPermissions
                value={permissions}
                onChange={(value) => form.setFieldValue('permissionIds', value)}
              />
              <div className='h-5 pt-2'>
                <Form.Item
                  label={rolesMessages.permissions}
                  prefixCls='hidden'
                  name='permissionIds'
                  rules={roleValidationRules.permissionIds}
                />
              </div>
            </Skeleton>
          </Form>
          <div className='sticky bottom-0 -mx-6 mt-2 h-20 border-t bg-white px-6'>
            <Button
              onClick={() => form.submit()}
              className='float-right my-5'
              loading={isLoadingCreate || isLoadingUpdate}
              type='primary'
              size='large'
            >
              {messages.saveButtonText}
            </Button>
          </div>
        </div>
      </Layout>
    </Layout>
  );
});
export default RoleForm;
