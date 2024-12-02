import { useEffect, useState } from 'react';
import { Modal, ModalProps } from '../modal';
import Avatar, { AvatarProps } from './Avatar';
import { Button, Divider, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { twMerge } from 'tailwind-merge';
import AvatarUploadOnlyCrop from './UploadOnly';
import { FileDto, ResponseDto } from 'types';
import { messages } from 'messages';
import { useUploadFileMutation } from 'services';
import { FilesBucketNames } from 'utils';
import { PlusIcon } from 'assets';

type IconItem = {
  key: string;
  icon:
    | React.ComponentType<CustomIconComponentProps | React.SVGProps<SVGSVGElement>>
    | React.ForwardRefExoticComponent<CustomIconComponentProps>;
  path: string;
};
type SelectAvatarProps = AvatarProps & {
  modalProps?: ModalProps;
  iconItems?: IconItem[];
  onChange?: (fileId: number) => void;
  size?: number;
  selectOnly?: boolean;
  shape?: 'circle' | 'square';
};
function SelectAvatar({ size = 48, modalProps, iconItems, onChange, selectOnly, ...props }: SelectAvatarProps) {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconItem>();
  const [fileId, setFileId] = useState<number | undefined>(props.fileId);
  const [onUpload, { isLoading: isLoadingUpload }] = useUploadFileMutation();

  useEffect(() => {
    setFileId(props.fileId);
  }, [props.fileId]);

  const handleUpload = (file: FileDto) => {
    setFileId(file.fileId);
  };

  const handleSave = async () => {
    if (fileId) {
      onChange?.(fileId);
    }
    if (selectedIcon) {
      const uploadResponse = await handleUploadIcon(selectedIcon);
      if (uploadResponse) onChange?.(uploadResponse.data.fileId);
    }
    setOpen(false);
  };

  const handleUploadIcon = async (selectedIcon: IconItem): Promise<ResponseDto<FileDto> | undefined> => {
    try {
      const fileResponse = await fetch(selectedIcon.path);
      const file = await fileResponse.blob();
      const uploadResponse = await onUpload({
        bucketName: FilesBucketNames.PUBLIC,
        file
      }).unwrap();
      return uploadResponse;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {fileId ? (
        <Avatar
          {...props}
          className={twMerge('cursor-pointer border border-colorBorder', props.className)}
          size={size}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Button
          shape={props.shape === 'square' ? 'default' : props.shape}
          type='dashed'
          style={{ width: size, height: size }}
          onClick={() => setOpen(true)}
        >
          <PlusIcon />
        </Button>
      )}
      <Modal
        {...modalProps}
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Button key='save' type='primary' loading={isLoadingUpload} onClick={handleSave}>
            {messages.saveButtonText}
          </Button>
        }
      >
        <Typography.Title level={5} className='mb-4 text-2.5xl'>
          {messages.updateAvatar}
        </Typography.Title>
        <div className='flex w-full flex-col items-center'>
          {!selectOnly ? (
            <>
              <AvatarUploadOnlyCrop {...props} fileId={fileId} size={size} onUploadSuccess={handleUpload} />
              <Divider />
            </>
          ) : null}

          <div className='flex flex-wrap gap-4'>
            {iconItems?.map((iconItem) => (
              <div
                key={iconItem.key}
                className={twMerge(
                  'flex h-[48px] w-[48px] cursor-pointer items-center justify-center border hover:border-colorPrimary',
                  iconItem.key === selectedIcon?.key ? 'border-colorPrimaryActive shadow-active' : '',
                  props.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
                )}
                onClick={() => setSelectedIcon(iconItem)}
                style={{ backgroundColor: props.avatarBackground ?? 'white' }}
              >
                <Icon component={iconItem.icon} className='text-[24px]' />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SelectAvatar;
