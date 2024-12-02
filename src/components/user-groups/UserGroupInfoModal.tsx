import { Button, Modal, ModalProps, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { messages, userGroupsMessages } from 'messages';
import UserGroupForm, { UserGroupFormRefProps } from './UserGroupForm';
import { UserGroupDto } from 'types';

type UserGroupInfoModalProps = ModalProps & {
  userGroupId?: number;
  onClose?: () => void;
  onCloseAndUpdatePermission?: (userGroup: UserGroupDto) => void;
};

const UserGroupInfoModal = ({
  userGroupId,
  onClose,
  onCloseAndUpdatePermission,
  ...props
}: UserGroupInfoModalProps) => {
  const [loading, setLoading] = useState(false);

  const userGroupFormRef = useRef<UserGroupFormRefProps>(null);
  const openPermissionRef = useRef(false);

  useEffect(() => {
    if (!props.open && userGroupFormRef.current) {
      userGroupFormRef.current.form.resetFields();
      openPermissionRef.current = false;
    }
  }, [props.open, userGroupFormRef.current]);

  return (
    <Modal
      {...props}
      maskClosable={false}
      centered
      width={568}
      destroyOnClose
      footer={
        <div className='flex w-full items-center justify-end gap-x-4'>
          {!userGroupId ? (
            <Button
              key='save-and-open-permission'
              type='link'
              loading={loading}
              className='font-normal'
              onClick={() => {
                if (userGroupFormRef.current) {
                  openPermissionRef.current = true;
                  userGroupFormRef.current.form.submit();
                }
              }}
            >
              {userGroupsMessages.saveAndUpdatePermissions}
            </Button>
          ) : undefined}
          <Button
            key='btn-submit'
            loading={loading}
            onClick={() => {
              if (userGroupFormRef.current) {
                userGroupFormRef.current.form.submit();
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
        {userGroupId ? userGroupsMessages.update : userGroupsMessages.createNew}
      </Typography.Title>
      <UserGroupForm
        userGroupId={userGroupId}
        onSubmitSuccess={(userGroup?: UserGroupDto) => {
          if (userGroup && openPermissionRef.current) {
            onCloseAndUpdatePermission?.(userGroup);
          } else {
            onClose?.();
          }
        }}
        ref={userGroupFormRef}
        onChangeLoading={setLoading}
      />
    </Modal>
  );
};

export default UserGroupInfoModal;
