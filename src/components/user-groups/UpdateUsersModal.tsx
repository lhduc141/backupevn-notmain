import { Button, Modal, ModalProps, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import UserGroupUpdateUsersForm, { UserGroupUpdateUsersFormRefProps } from './UserGroupUpdateUsersForm';
import { messages, userGroupsMessages } from 'messages';

type UpdateUserModalProps = ModalProps & {
  userGroupId?: number;
  onClose?: () => void;
};

const UpdateUserModal = ({ userGroupId, onClose, ...props }: UpdateUserModalProps) => {
  const [loading, setLoading] = useState(false);

  const userStatusFormRef = useRef<UserGroupUpdateUsersFormRefProps>(null);

  useEffect(() => {
    if (!props.open && userStatusFormRef.current) {
      userStatusFormRef.current.form.resetFields();
    }
  }, [props.open, userStatusFormRef.current]);

  return (
    <Modal
      {...props}
      classNames={{ content: 'bg-colorBgBody' }}
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
      <Typography.Title level={5} className='mb-6 mt-10 text-2.5xl'>
        {userGroupsMessages.updateUsers}
      </Typography.Title>
      {userGroupId && (
        <UserGroupUpdateUsersForm
          userGroupId={userGroupId}
          onChangeSuccess={onClose}
          ref={userStatusFormRef}
          onChangeLoading={setLoading}
        />
      )}
    </Modal>
  );
};

export default UpdateUserModal;
