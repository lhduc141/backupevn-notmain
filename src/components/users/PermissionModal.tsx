import { ModalProps } from 'antd';
import { useEffect, useRef } from 'react';
import { Modal } from 'components/common';
import UserUpdatePermissionsForm, { UserUpdatePermissionsFormRefProps } from './UserUpdatePermissionsForm';

type PermissionModalProps = ModalProps & {
  userId?: number;
  onClose?: () => void;
};

const PermissionModal = ({ userId, onClose, ...props }: PermissionModalProps) => {
  const permissionFormRef = useRef<UserUpdatePermissionsFormRefProps>(null);

  useEffect(() => {
    if (!props.open && permissionFormRef.current) {
      permissionFormRef.current.form.resetFields();
    }
  }, [props.open, permissionFormRef.current]);

  return (
    <Modal.Small
      {...props}
      styles={{
        body: {
          padding: 0,
          borderRadius: 12,
          overflow: 'hidden'
        }
      }}
      footer={null}
      centered
      destroyOnClose
      width={908}
    >
      <UserUpdatePermissionsForm
        onChangeSuccess={() => {
          onClose?.();
        }}
        ref={permissionFormRef}
        userId={userId}
      />
    </Modal.Small>
  );
};

export default PermissionModal;
