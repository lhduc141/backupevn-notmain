import { ModalProps } from 'antd';
import { useEffect, useRef } from 'react';
import UserGroupUpdatePermissionsForm, {
  UserGroupUpdatePermissionsFormRefProps
} from './UserGroupUpdatePermissionsForm';
import { Modal } from 'components/common';

type UpdatePermissionsModalProps = ModalProps & {
  userGroupId?: number;
  onClose?: () => void;
};

const UpdatePermissionsModal = ({ userGroupId, onClose, ...props }: UpdatePermissionsModalProps) => {
  const userStatusFormRef = useRef<UserGroupUpdatePermissionsFormRefProps>(null);

  useEffect(() => {
    if (!props.open && userStatusFormRef.current) {
      userStatusFormRef.current.form.resetFields();
    }
  }, [props.open, userStatusFormRef.current]);

  return (
    <Modal.Small {...props} footer={null} centered destroyOnClose width={908}>
      <UserGroupUpdatePermissionsForm userGroupId={userGroupId} onChangeSuccess={onClose} ref={userStatusFormRef} />
    </Modal.Small>
  );
};

export default UpdatePermissionsModal;
