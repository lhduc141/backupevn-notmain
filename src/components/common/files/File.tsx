import { DeleteFilled, EyeFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { convertFileType, FILE_TYPE } from 'utils';
import Image from './Image';
import OtherFile from './OtherFile';
export type FileData = { url?: string; type?: string; name?: string };
type FileProps = FileData & {
  className?: string;
  remove?: () => void;
  isError?: boolean;
  isPreview?: boolean;
  preview?: (value: FileData) => void;
  error?: {
    message?: string;
  };
  fileClassName?: string;
  showInfo?: boolean;
  fileSize?: number;
  iconSize?: number;
};
const File = ({
  url,
  type,
  name,
  remove,
  preview,
  isPreview,
  className,
  isError,
  error,
  fileClassName,
  showInfo,
  fileSize,
  iconSize,
  ...props
}: FileProps) => {
  const renderFile = useCallback(() => {
    if (isError)
      return (
        <div className='flex w-24 flex-col items-center justify-center gap-2'>
          <InfoCircleOutlined className='text-2xl text-colorError' />
          {error?.message && (
            <Typography.Text className='text-center text-xs' type='danger'>
              {error?.message}
            </Typography.Text>
          )}
        </div>
      );
    switch (convertFileType(type)) {
      case FILE_TYPE.IMAGE:
        return <Image className={fileClassName} url={url} alt={name}></Image>;
      default:
        return (
          <OtherFile
            iconSize={iconSize}
            fileSize={fileSize}
            showInfo={showInfo}
            className={fileClassName}
            name={name}
            type={type}
          />
        );
    }
  }, [url, type, name]);

  const actions = () => {
    if (remove || isPreview)
      return (
        <div className='absolute inset-0 flex cursor-pointer items-center justify-center bg-colorBgContainerHover text-white opacity-0 transition-opacity duration-300 hover:opacity-100'>
          {remove && (
            <Button
              type='text'
              ghost
              className='h-6 w-6 text-white hover:bg-spotlightHover'
              icon={<DeleteFilled />}
              size='small'
              onClick={() => remove()}
            />
          )}
          {isPreview && (
            <Button
              type='text'
              ghost
              className='h-6 w-6 text-white hover:bg-spotlightHover'
              icon={<EyeFilled />}
              size='small'
              onClick={() =>
                preview?.({
                  url,
                  type,
                  name
                })
              }
            />
          )}
        </div>
      );
  };

  return (
    <div
      className={twMerge(
        'relative flex h-full flex-col items-center justify-center gap-2 rounded-base border p-1',
        className
      )}
      {...props}
    >
      {renderFile()}
      {actions()}
    </div>
  );
};
export default File;
