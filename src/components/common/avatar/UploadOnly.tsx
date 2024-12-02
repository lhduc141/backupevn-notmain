import { Button, Progress, Upload } from 'antd';
import ImageCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import { AxiosProgressEvent } from 'axios';
import { messages } from 'messages';
import { notificationsMessages } from 'messages/notification.messages';
import { useState } from 'react';
import { useUpdateFileMutation, useUploadFileMutation } from 'services';
import { FileDto } from 'types';
import { FilesBucketNames } from 'utils';
import message from '../message';
import Avatar, { AvatarProps } from './Avatar';
import { PlusIcon } from 'assets';

type AvatarUploadOnlyProps = AvatarProps & {
  onUploadSuccess?: (value: FileDto) => void;
};
export default function AvatarUploadOnlyCrop({
  onUploadSuccess,
  size = 48,
  isLoading,
  ...props
}: AvatarUploadOnlyProps) {
  const [progress, setProgress] = useState<number | undefined>();
  const [onUpload, { isLoading: isLoadingUpload }] = useUploadFileMutation();
  const [onUpdate, { isLoading: isLoadingUpdate }] = useUpdateFileMutation();

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

  const validateImageType = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(messages.fileFormatError);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <div
      className='relative inline-block'
      style={{
        width: size,
        height: size
      }}
    >
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
          accept={'.jpeg, .png, .jpg'}
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
          {props.fileId || props.name ? (
            <Avatar isLoading={isLoading || isLoadingUpload || isLoadingUpdate} {...props} size={size} />
          ) : (
            <Button shape='circle' type='dashed' style={{ width: size, height: size }}>
              <PlusIcon />
            </Button>
          )}
          <div className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-colorBgContainerHover text-white opacity-0 transition-opacity duration-300 hover:opacity-100'></div>
        </Upload>
      </ImageCrop>
    </div>
  );
}
