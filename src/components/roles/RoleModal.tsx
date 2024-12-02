import { ModalProps } from 'antd';
import RoleForm, { RoleFormRefProps } from './RoleForm';
import { useEffect, useRef } from 'react';
import { Modal } from 'components/common';

type RoleModalProps = ModalProps & {
  roleId?: number;
  onClose?: () => void;
};

const RoleModal = ({ roleId, onClose, ...props }: RoleModalProps) => {
  const roleFormRef = useRef<RoleFormRefProps>(null);

  useEffect(() => {
    if (!props.open && roleFormRef.current) {
      roleFormRef.current.form.resetFields();
    }
  }, [props.open, roleFormRef.current]);

  return (
    <Modal.Small {...props} footer={null} centered destroyOnClose width={908}>
      <RoleForm
        onCreateSuccess={() => {
          onClose?.();
        }}
        ref={roleFormRef}
        roleId={roleId}
      />
    </Modal.Small>
  );
};

export default RoleModal;
