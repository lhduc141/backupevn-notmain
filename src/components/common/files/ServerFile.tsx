import { Progress, Spin } from 'antd';
import { useFile } from 'hooks/files';
import { PropsWithChildren, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { colorsBase } from 'themes';
import { FileDto } from 'types';
import File, { FileData } from './File';

type FileProps = PropsWithChildren & {
  fileId?: number;
  percent?: number;
  uploading?: boolean;
  isError?: boolean;
  className?: string;
  remove?: (fileId?: number) => void;
  onDataFetched?: (file: FileDto) => void;
  preview?: (data: FileData) => void;
  isPreview?: boolean;
  fileClassName?: string;
  showInfo?: boolean;
  iconSize?: number;
};
const ServerFile = ({
  fileId,
  percent,
  className,
  remove,
  preview,
  isPreview,
  isError,
  onDataFetched,
  fileClassName,
  showInfo,
  iconSize,
  ...props
}: FileProps) => {
  const { file, isLoading, isError: isErrorGet, error } = useFile(fileId);
  useEffect(() => {
    if (file && onDataFetched) {
      onDataFetched(file);
    }
  }, [file]);
  if (!file && !isErrorGet)
    return (
      <div
        className={twMerge(
          'relative flex h-full flex-col items-center justify-center gap-2 rounded-base border p-1',
          className
        )}
        {...props}
      >
        <div className='flex w-24 flex-col'>
          <Spin spinning={isLoading} />
          <Progress size={'small'} strokeColor={colorsBase.colorPrimary} showInfo={false} percent={percent} />
        </div>
      </div>
    );
  return (
    <File
      fileClassName={fileClassName}
      preview={preview}
      isPreview={isPreview}
      className={className}
      url={file?.url}
      name={file?.originalName ?? file?.objectName}
      type={file?.fileType}
      isError={isError || isErrorGet}
      error={error}
      remove={remove}
      showInfo={showInfo}
      fileSize={file?.fileSize}
      iconSize={iconSize}
    />
  );
};
export default ServerFile;
