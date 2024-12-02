import { Button, Modal, Skeleton, Space, Typography } from 'antd';
import { IdCardIcon, MailIcon, PasswordIcon, PhoneIcon, UserIcon } from 'assets';
import { UserChangePasswordForm } from 'components';
import { Avatar, NavigateBack, PageHeader } from 'components/common';
import { useUpdateUser, useUser } from 'hooks';
import { messages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileDto } from 'types';
import { DEFAULT_PASSWORD_CHART } from 'utils';
import { UserChangePasswordFormRefProps } from './UserChangePasswordForm';
import { ROUTE } from 'routes/constants';

type UserPersonalInfoProps = {
  userId: number;
};
const UserPersonalInfo = ({ userId }: UserPersonalInfoProps) => {
  const { user, isLoading } = useUser(userId);
  const { isLoading: isLoadingUpdate, onUpdateUserHandle } = useUpdateUser(userId);
  const [openChangePass, setOpenChangePass] = useState(false);

  const [loading, setLoading] = useState(false);
  const changePassFormRef = useRef<UserChangePasswordFormRefProps>(null);

  useEffect(() => {
    if (!openChangePass && changePassFormRef.current) {
      changePassFormRef.current.form.resetFields();
    }
  }, [openChangePass, changePassFormRef.current]);

  const onUpdateAvatarHandle = (value: FileDto) => {
    if (value) {
      onUpdateUserHandle({
        avatar: value.fileId
      });
    }
  };
  const onDeleteAvatarHandle = () => {
    onUpdateUserHandle({
      avatar: null
    });
  };
  return (
    <div className='flex flex-col gap-4'>
      <PageHeader className='flex items-center gap-1'>
        <NavigateBack defaultUrl={ROUTE.USERS} />
        <Skeleton active loading={isLoading}>
          <Typography.Title className='mb-0' level={4}>
            {user?.fullName}
          </Typography.Title>
        </Skeleton>
      </PageHeader>
      <div
        className={twMerge(
          'flex h-[156px] w-full items-center rounded-xl bg-colorBgContainer px-5',
          isLoading && 'skeleton-active'
        )}
      >
        <div className='flex w-full gap-6'>
          <div className='flex flex-1 flex-col items-center justify-center gap-4'>
            <Avatar.UploadCrop
              onUploadSuccess={onUpdateAvatarHandle}
              fileId={user?.avatar}
              size={84}
              name={user?.fullName}
              isLoading={isLoadingUpdate}
              onDeleteSuccess={onDeleteAvatarHandle}
            />
            <Typography.Text className='text-lg font-semibold'>{user?.fullName}</Typography.Text>
          </div>
          {user && (
            <div className='flex flex-1 flex-col justify-center gap-4'>
              <Space direction='vertical' size={0}>
                <Typography.Text className='text-xs'>{usersMessages.employeeId}</Typography.Text>
                <Typography.Text className='font-medium'>{user.employeeId}</Typography.Text>
              </Space>

              <Space direction='vertical' size={0}>
                <Typography.Text className='text-xs'>{usersMessages.unit}</Typography.Text>
                <Typography.Text className='font-medium'>{user.organizationUnit?.name}</Typography.Text>
              </Space>
            </div>
          )}
        </div>
      </div>
      <div
        className={twMerge(
          'flex flex-col gap-4 rounded-xl bg-colorBgContainer p-5',
          isLoading && 'skeleton-active min-h-[264px]'
        )}
      >
        {user && !isLoading && (
          <>
            <Space size={12}>
              <IdCardIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{user.username ?? '-'}</Typography.Text>
            </Space>
            <Space size={12}>
              <MailIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{user.email ?? '-'}</Typography.Text>
            </Space>
            <Space size={12}>
              <PhoneIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{user.phoneNumber ?? '-'}</Typography.Text>
            </Space>
            <Space size={12}>
              <UserIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{user.gender?.name ?? '-'}</Typography.Text>
            </Space>
            <div className='flex w-full justify-between'>
              <Space align='center' size={12} className='w-full'>
                <PasswordIcon className='h-6 w-6' />
                <Typography.Text type='secondary'>{DEFAULT_PASSWORD_CHART}</Typography.Text>
              </Space>
              <Button
                onClick={() => {
                  setOpenChangePass(true);
                }}
                type='link'
              >
                {usersMessages.changePassword}
              </Button>
            </div>
          </>
        )}
      </div>
      <div
        className={twMerge(
          'flex flex-col gap-4 rounded-xl bg-colorBgContainer p-5',
          isLoading && 'skeleton-active min-h-[60px]'
        )}
      >
        {user && (
          <>
            <Space size={12}>
              <Typography.Text>{usersMessages.group}</Typography.Text>
              <Typography.Text type='secondary'>{user.userGroup?.name || '-'}</Typography.Text>
            </Space>
          </>
        )}
      </div>
      <Modal
        centered
        width={568}
        title={usersMessages.changePassword}
        open={openChangePass}
        onCancel={() => {
          setOpenChangePass(false);
        }}
        footer={[
          <Button
            loading={loading}
            onClick={() => {
              if (changePassFormRef.current) {
                changePassFormRef.current.form.submit();
              }
            }}
            size='large'
            type='primary'
          >
            {messages.saveButtonText}
          </Button>
        ]}
      >
        <UserChangePasswordForm
          userId={userId}
          onChangeSuccess={() => {
            setOpenChangePass(false);
          }}
          ref={changePassFormRef}
          onChangeLoading={setLoading}
        />
      </Modal>
    </div>
  );
};
export default UserPersonalInfo;
