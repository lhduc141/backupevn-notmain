import { Button, Modal, ModalProps, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { messages, usersMessages } from 'messages';
import UserForm, { UserFormRefProps } from './UserForm';
import { UserDto } from 'types';

type UserInfoModalProps = ModalProps & {
  userId?: number;
  onClose?: () => void;
  onCloseAndUpdatePermission?: (user: UserDto) => void;
};

const UserInfoModal = ({ userId, onClose, onCloseAndUpdatePermission, ...props }: UserInfoModalProps) => {
  const [loading, setLoading] = useState(false);

  const userFormRef = useRef<UserFormRefProps>(null);
  const openPermissionRef = useRef(false);

  useEffect(() => {
    if (!props.open && userFormRef.current) {
      userFormRef.current.form.resetFields();
      openPermissionRef.current = false;
    }
  }, [props.open, userFormRef.current]);

  return (
    <Modal
      {...props}
      maskClosable={false}
      centered
      width={568}
      destroyOnClose
      footer={
        <div className='flex w-full items-center justify-end gap-x-4'>
          {!userId ? (
            <Button
              key='save-and-open-permission'
              type='link'
              loading={loading}
              className='font-normal'
              onClick={() => {
                if (userFormRef.current) {
                  openPermissionRef.current = true;
                  userFormRef.current.form.submit();
                }
              }}
            >
              {usersMessages.saveAndUpdatePermissions}
            </Button>
          ) : undefined}
          <Button
            key='btn-submit'
            loading={loading}
            onClick={() => {
              if (userFormRef.current) {
                userFormRef.current.form.submit();
              }
            }}
            size='large'
            type='primary'
          >
            {messages.saveButtonText}
          </Button>
        </div>
      }
    >
      <Typography.Title level={4} className='mb-6 mt-10 text-2.5xl'>
        {userId ? usersMessages.updateUser : usersMessages.createUser}
      </Typography.Title>
      <UserForm
        userId={userId}
        onSubmitSuccess={(user?: UserDto) => {
          if (user && openPermissionRef.current) {
            onCloseAndUpdatePermission?.(user);
          } else {
            onClose?.();
          }
        }}
        ref={userFormRef}
        onChangeLoading={setLoading}
      />
    </Modal>
  );
};

export default UserInfoModal;
