import { Button, Modal, ModalProps } from 'antd';
import UserChangeStatusForm, { UserChangeStatusFormRefProps } from './UserChangeStatusForm';
import { useEffect, useRef, useState } from 'react';
import { messages } from 'messages';

type ChangeUserStatusModalProps = ModalProps & {
  userId?: number;
  onClose?: () => void;
};

const ChangeUserStatusModal = ({ userId, onClose, ...props }: ChangeUserStatusModalProps) => {
  const [loading, setLoading] = useState(false);

  const userStatusFormRef = useRef<UserChangeStatusFormRefProps>(null);

  useEffect(() => {
    if (!props.open && userStatusFormRef.current) {
      userStatusFormRef.current.form.resetFields();
    }
  }, [props.open, userStatusFormRef.current]);

  return (
    <Modal
      {...props}
      maskClosable={false}
      centered
      destroyOnClose
      footer={[
        <Button
          key='btn-submit'
          loading={loading}
          onClick={() => {
            if (userStatusFormRef.current) {
              userStatusFormRef.current.form.submit();
            }
          }}
          size='large'
          type='primary'
        >
          {messages.saveButtonText}
        </Button>
      ]}
    >
      <div className='mt-10'>
        {userId && (
          <UserChangeStatusForm
            userId={userId}
            onChangeSuccess={onClose}
            ref={userStatusFormRef}
            onChangeLoading={setLoading}
          />
        )}
      </div>
    </Modal>
  );
};

export default ChangeUserStatusModal;
