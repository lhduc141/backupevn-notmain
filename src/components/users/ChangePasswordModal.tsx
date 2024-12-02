import { Button, ModalProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { messages, usersMessages } from 'messages';
import UserChangePasswordForm, { UserChangePasswordFormRefProps } from './UserChangePasswordForm';
import { Modal } from 'components';

type ChangePasswordModalProps = ModalProps & {
  userId?: number;
  onClose?: () => void;
};

const ChangePasswordModal = ({ userId, onClose, ...props }: ChangePasswordModalProps) => {
  const [loading, setLoading] = useState(false);

  const userPasswordFormRef = useRef<UserChangePasswordFormRefProps>(null);

  useEffect(() => {
    if (!props.open && userPasswordFormRef.current) {
      userPasswordFormRef.current.form.resetFields();
    }
  }, [props.open, userPasswordFormRef.current]);

  return (
    <Modal.Headless
      {...props}
      title={usersMessages.changePassword}
      maskClosable={false}
      centered
      width={688}
      destroyOnClose
      footer={[
        <Button
          key='btn-submit'
          loading={loading}
          onClick={() => {
            if (userPasswordFormRef.current) {
              userPasswordFormRef.current.form.submit();
            }
          }}
          size='large'
          type='primary'
        >
          {messages.saveButtonText}
        </Button>
      ]}
    >
      {userId && (
        <UserChangePasswordForm
          userId={userId}
          onChangeSuccess={onClose}
          ref={userPasswordFormRef}
          onChangeLoading={setLoading}
        />
      )}
    </Modal.Headless>
  );
};

export default ChangePasswordModal;
