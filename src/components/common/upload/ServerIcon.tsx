import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal } from '../modal';
import { Button, Divider, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { twMerge } from 'tailwind-merge';
import { IconItem } from 'types';
import { messages } from 'messages';
import { FilesBucketNames } from 'utils';
import { PlusIcon } from 'assets';
import { File } from '../files';
import ServerDragger from './ServerDragger';
import { ServerUploadProps } from './ServerUpload';
import { useUploadForm } from 'hooks';

type ServerIconProps = Pick<ServerUploadProps, 'crop' | 'cropProps'> & {
  iconItems?: IconItem[];
  onChange?: (fileId: number) => void;
  size?: number;
  shape?: 'circle' | 'square';
  iconSize?: number;
  fileId?: number;
};
export type ServerIconRefProps = {
  setOpen: (value: boolean) => void;
};
const ServerIcon = forwardRef<ServerIconRefProps, ServerIconProps>(
  ({ size = 56, iconSize = 24, iconItems, onChange, crop = true, cropProps, ...props }, ref) => {
    useImperativeHandle(ref, () => ({
      setOpen: setOpen
    }));
    const { handleUploadIcon } = useUploadForm();
    const [open, setOpen] = useState(false);
    const [fileId, setFileId] = useState<number | undefined>(props.fileId);

    useEffect(() => {
      setFileId(props.fileId);
    }, [props.fileId]);

    const onSelectIconAvailable = async (iconItem: IconItem) => {
      const uploadResponse = await handleUploadIcon(iconItem);
      if (uploadResponse) onChange?.(uploadResponse.data.fileId);
      setOpen(false);
    };

    return (
      <>
        {fileId ? (
          <div
            className='flex cursor-pointer items-center justify-center bg-backgroundColor3'
            style={{ width: size, height: size, borderRadius: Math.max(size / 7, 4) }}
            onClick={() => setOpen(true)}
          >
            <File.Server fileId={fileId} fileClassName='h-6 w-6' className='border-none' />
          </div>
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
        <Modal.Headless title={messages.selectIcon} open={open} onCancel={() => setOpen(false)} footer={null}>
          <div className='flex w-full flex-col pt-2'>
            {iconItems?.length && (
              <>
                <div>
                  <Typography.Paragraph className='mb-6'>{messages.iconsAvailable}</Typography.Paragraph>
                  <div className='flex w-full flex-wrap gap-4'>
                    {iconItems?.map((iconItem) => (
                      <div
                        key={iconItem.key}
                        className={twMerge(
                          'flex h-6 w-6 cursor-pointer items-center justify-center border bg-backgroundColor3 transition-all hover:scale-125',
                          props.shape === 'circle' ? 'rounded-full' : 'rounded-base'
                        )}
                        onClick={() => onSelectIconAvailable(iconItem)}
                      >
                        <Icon component={iconItem.icon} className='text-base' />
                      </div>
                    ))}
                  </div>
                </div>
                <Divider className='my-8' />
              </>
            )}

            <div>
              <Typography.Paragraph className='mb-6'>{messages.uploadFromDevice}</Typography.Paragraph>
              <ServerDragger
                accept='.jpg, .png, .jpeg'
                fileList={[]}
                onUploadSuccess={(file) => {
                  onChange?.(file.fileId);
                  setOpen(false);
                }}
                crop={crop}
                bucketName={FilesBucketNames.PUBLIC}
                cropProps={{
                  ...(cropProps || {}),
                  cropShape: props.shape === 'square' ? 'rect' : 'round'
                }}
              ></ServerDragger>
            </div>
          </div>
        </Modal.Headless>
      </>
    );
  }
);

export default ServerIcon;
