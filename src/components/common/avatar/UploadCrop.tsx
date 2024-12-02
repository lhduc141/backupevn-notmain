import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Progress, Typography, Upload } from 'antd';
import ImageCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import { AxiosProgressEvent } from 'axios';
import { messages } from 'messages';
import { notificationsMessages } from 'messages/notification.messages';
import { useState } from 'react';
import { useDeleteFileMutation, useUpdateFileMutation, useUploadFileMutation } from 'services';
import { FileDto } from 'types';
import { FilesBucketNames } from 'utils';
import message from '../message';
import Avatar, { AvatarProps } from './Avatar';

type AvatarUploadCropProps = AvatarProps & {
  onUploadSuccess?: (value: FileDto) => void;
  onDeleteSuccess?: () => void;
};
export default function AvatarUploadCrop({
  onUploadSuccess,
  onDeleteSuccess,
  size = 48,
  isLoading,
  ...props
}: AvatarUploadCropProps) {
  const [progress, setProgress] = useState<number | undefined>();
  const [onUpload, { isLoading: isLoadingUpload }] = useUploadFileMutation();
  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateFileMutation();
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteFileMutation();

  const onChangeProgressHandle = (progressEvent: AxiosProgressEvent) => {
    const percent = progressEvent.progress ?? 0;
    setProgress(percent * 100);
  };
  const handleCrop = (file: File) => {
    if (file) {
      if (props.fileId) {
        onUpdate({
          fileId: props.fileId,
          file,
          onUploadProgress: onChangeProgressHandle
        })
          .unwrap()
          .then((rs) => {
            message.systemSuccess(notificationsMessages.updateAvatarSuccess);
            if (props.fileId !== rs.data.fileId) {
              onUploadSuccess?.(rs.data);
            }
            setProgress(0);
          });
      } else {
        onUpload({
          bucketName: FilesBucketNames.PUBLIC,
          file,
          onUploadProgress: onChangeProgressHandle
        })
          .unwrap()
          .then((rs) => {
            onUploadSuccess?.(rs.data);
            setProgress(0);
          });
      }
    }
  };
  const onDeleteHandle = () => {
    if (props.fileId) {
      onDelete(props.fileId)
        .unwrap()
        .then((rs) => {
          onDeleteSuccess?.();
          setProgress(0);
        });
    }
  };

  const validateImageType = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(messages.fileFormatError);
      return false;
    }
    return true;
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ImageCrop
          modalTitle={messages.changeAvatar}
          cropShape='round'
          modalOk={messages.confirmButtonText}
          modalCancel={messages.cancelButtonText}
          onModalOk={(file) => handleCrop(file as File)}
        >
          <Upload
            showUploadList={false}
            beforeUpload={validateImageType}
            customRequest={() => true}
            name='avatar'
            multiple={false}
          >
            <Typography.Text>{messages.changeAvatar}</Typography.Text>
          </Upload>
        </ImageCrop>
      ),

      icon: <UploadOutlined />
    },
    {
      key: '2',
      label: messages.deleteAvatar,
      icon: <DeleteOutlined />,
      danger: true,
      onClick: onDeleteHandle
    }
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div
        className='relative inline-block'
        style={{
          width: size,
          height: size
        }}
      >
        {(isLoadingUpload || isLoadingUpdate) && (
          <Progress
            className='absolute left-[-6px] top-[-6px] h-full w-full'
            type='circle'
            percent={progress}
            strokeWidth={6}
            format={() => ''}
          />
        )}
        <Avatar isLoading={isLoading || isLoadingUpload || isLoadingUpdate || isLoadingDelete} {...props} size={size} />
        <div className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-colorBgContainerHover text-white opacity-0 transition-opacity duration-300 hover:opacity-100'></div>
      </div>
    </Dropdown>
  );
}
