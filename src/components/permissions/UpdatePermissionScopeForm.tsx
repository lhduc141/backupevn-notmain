import { Form, FormInstance, Skeleton } from 'antd';
import { message } from 'components/common';
import { validateMessages } from 'messages';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { UpdatePermissionScopeDto } from 'types';
import { TreeCheckboxOrganizationUnits } from 'components';
import { useGetPermissionDetailQuery, useUpdatePermissionScopeMutation } from 'services';
import { updatePermissionScopeInitialValues } from 'utils/initial-values/permissions';
export type PermissionScopeFormProps = {
  onChangeLoading?: (value: boolean) => void;
  onCreateSuccess?: () => void;
  permissionId?: number;
};

export type PermissionScopeFormRefProps = {
  form: FormInstance<PermissionScopeFormType>;
  isLoading: boolean;
};

export type PermissionScopeFormType = Omit<UpdatePermissionScopeDto, 'permissionId'>;
const PermissionScopeForm = forwardRef<PermissionScopeFormRefProps, PermissionScopeFormProps>(
  ({ onChangeLoading, onCreateSuccess, permissionId }, ref) => {
    useImperativeHandle(ref, () => ({
      form: form,
      isLoading: isLoadingUpdate
    }));

    const [form] = Form.useForm<PermissionScopeFormType>();
    const organizationUnitIds = Form.useWatch('organizationUnitIds', form) ?? [];

    const { data: permission, isLoading: isLoadingDetail } = useGetPermissionDetailQuery(permissionId!, {
      skip: !permissionId,
      refetchOnMountOrArgChange: true
    });

    const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdatePermissionScopeMutation();

    useEffect(() => {
      if (permission && permissionId) {
        form.setFieldsValue({
          organizationUnitIds: permission.data.organizationUnits?.map((orgUnit) => orgUnit.organizationUnitId)
        });
      }
    }, [permission, permissionId]);

    const onFinish = (values: PermissionScopeFormType) => {
      if (!permissionId) return;

      onUpdate({
        ...values,
        permissionId: permissionId
      })
        .unwrap()
        .then((rs) => {
          message.systemSuccess(rs.message);
          onCreateSuccess?.();
        });
    };
    useEffect(() => {
      if (onChangeLoading) {
        onChangeLoading(isLoadingUpdate);
      }
    }, [onChangeLoading, isLoadingUpdate]);

    return (
      <Form
        scrollToFirstError={{ behavior: 'smooth', block: 'start' }}
        labelAlign='right'
        labelCol={{
          flex: '180px'
        }}
        requiredMark={false}
        form={form}
        name='permissionScopeForm'
        onFinish={onFinish}
        layout='horizontal'
        validateMessages={validateMessages}
        initialValues={updatePermissionScopeInitialValues}
      >
        <Skeleton loading={isLoadingDetail}>
          <Form.Item<UpdatePermissionScopeDto> name='organizationUnitIds' noStyle />
          <TreeCheckboxOrganizationUnits
            value={organizationUnitIds}
            onChange={(value) => form.setFieldValue('organizationUnitIds', value)}
          />
        </Skeleton>
      </Form>
    );
  }
);
export default PermissionScopeForm;
