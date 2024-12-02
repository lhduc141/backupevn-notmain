import { Button, Modal, Space, Typography } from 'antd';
import { IdCardIcon, MailIcon, PasswordIcon, PhoneIcon, UserIcon } from 'assets';
import { ChangePasswordForm, ChangePasswordFormRefProps } from 'components/auth';
import { Avatar } from 'components/common';
import { useUpdateUserProfile } from 'hooks';
import { messages } from 'messages';
import { usersMessages } from 'messages/users.messages';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { twMerge } from 'tailwind-merge';
import { FileDto } from 'types';
import { DEFAULT_PASSWORD_CHART } from 'utils';

const UserProfilePersonalInfo = () => {
  const profile = useSelector((state: RootState) => state.users.userProfile);
  const { onUpdateUserProfileHandle, isLoading } = useUpdateUserProfile();
  const [openChangePass, setOpenChangePass] = useState(false);

  const [loading, setLoading] = useState(false);
  const changePassFormRef = useRef<ChangePasswordFormRefProps>(null);

  useEffect(() => {
    if (!openChangePass && changePassFormRef.current) {
      changePassFormRef.current.form.resetFields();
    }
  }, [openChangePass, changePassFormRef.current]);

  const onUpdateAvatarHandle = (value?: FileDto) => {
    if (value) {
      onUpdateUserProfileHandle({
        avatar: value.fileId
      });
    }
  };
  const onDeleteAvatarHandle = () => {
    onUpdateUserProfileHandle({
      avatar: null
    });
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className={twMerge('flex h-[156px] w-full items-center rounded-xl bg-colorBgContainer px-5')}>
        <div className='flex w-full gap-6'>
          <div className='flex flex-1 flex-col items-center justify-center gap-4'>
            <Avatar.UploadCrop
              onUploadSuccess={onUpdateAvatarHandle}
              fileId={profile?.avatar}
              size={84}
              name={profile?.fullName}
              isLoading={isLoading}
              onDeleteSuccess={onDeleteAvatarHandle}
            />
            <Typography.Text className='text-lg font-semibold'>{profile?.fullName}</Typography.Text>
          </div>
          {profile && (
            <div className='flex flex-1 flex-col justify-center gap-4'>
              <Space direction='vertical' size={0}>
                <Typography.Text className='text-xs'>{usersMessages.employeeId}</Typography.Text>
                <Typography.Text className='font-medium'>{profile.employeeId}</Typography.Text>
              </Space>

              <Space direction='vertical' size={0}>
                <Typography.Text className='text-xs'>{usersMessages.unit}</Typography.Text>
                <Typography.Text className='font-medium'>{profile.organizationUnit?.name}</Typography.Text>
              </Space>
            </div>
          )}
        </div>
      </div>
      <div className={twMerge('flex flex-col gap-4 rounded-xl bg-colorBgContainer p-5')}>
        {profile && (
          <>
            <Space size={12}>
              <IdCardIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{profile.username ?? '-'}</Typography.Text>
            </Space>
            <Space size={12}>
              <MailIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{profile.email ?? '-'}</Typography.Text>
            </Space>
            <Space size={12}>
              <PhoneIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{profile.phoneNumber ?? '-'}</Typography.Text>
            </Space>
            <Space size={12}>
              <UserIcon className='h-6 w-6' />
              <Typography.Text type='secondary'>{profile.gender?.name ?? '-'}</Typography.Text>
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
      <div className={twMerge('flex flex-col gap-4 rounded-xl bg-colorBgContainer p-5')}>
        {profile && (
          <>
            <Space size={12}>
              <Typography.Text>{usersMessages.group}</Typography.Text>
              <Typography.Text type='secondary'>{profile.userGroup?.name || '-'}</Typography.Text>
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
        <ChangePasswordForm
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
export default UserProfilePersonalInfo;
