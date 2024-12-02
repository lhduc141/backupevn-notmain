import { Button, Typography, ModalProps } from 'antd';
import { permissionsMessages, messages } from 'messages';
import UpdatePermissionScopeForm, { PermissionScopeFormRefProps } from './UpdatePermissionScopeForm';
import { useState, useRef } from 'react';
import { useGetPermissionDetailQuery } from 'services';
import { Modal } from 'components/common';

type UpdatePermissionScopeModalProps = ModalProps & {
  permissionId?: number;
  onClose?: () => void;
};

const UpdatePermissionScopeModal = ({ permissionId, onClose, ...props }: UpdatePermissionScopeModalProps) => {
  const [loading, setLoading] = useState(false);
  const permissionFormRef = useRef<PermissionScopeFormRefProps>(null);

  const { data: permission } = useGetPermissionDetailQuery(permissionId!, {
    skip: !permissionId,
    refetchOnMountOrArgChange: true
  });

  return (
    <Modal
      {...props}
      maskClosable={false}
      centered
      width={568}
      destroyOnClose
      footer={[
        <Button
          key='confirm'
          loading={loading}
          onClick={() => {
            if (permissionFormRef.current) {
              permissionFormRef.current.form.submit();
            }
          }}
          size='large'
          type='primary'
        >
          {messages.confirmButtonText}
        </Button>
      ]}
    >
      <Typography.Title className='mb-1 mt-10 text-2.5xl' level={4}>
        {permissionsMessages.scope}
      </Typography.Title>
      <Typography.Paragraph className='mb-8'>
        {permissionsMessages.page}: {permission?.data.name}
      </Typography.Paragraph>
      <UpdatePermissionScopeForm
        onCreateSuccess={() => {
          onClose?.();
        }}
        ref={permissionFormRef}
        onChangeLoading={setLoading}
        permissionId={permissionId}
      />
    </Modal>
  );
};

export default UpdatePermissionScopeModal;
