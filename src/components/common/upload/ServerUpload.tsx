import { Upload as UploadAntd } from 'antd';
import { UploadFile, UploadProps as UploadPropsAntd } from 'antd/es/upload';
import React from 'react';
import { FileDto } from 'types';
import { FilesBucketNames } from 'utils';
import { isServerUploadFile } from 'utils/upload';
import { File } from '../files';
import { useServerUpload } from 'hooks';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { messages } from 'messages';

export type ServerFileWithUid = {
  uid: string | number;
  fileId: number;
};
export type ServerUploadFile = UploadFile<FileDto> | ServerFileWithUid;

export type ServerUploadProps = UploadPropsAntd & {
  bucketName: FilesBucketNames;
  onUploadSuccess?: (value: FileDto) => void;
  crop?: boolean;
  cropProps?: Omit<ImgCropProps, 'children'>;
};

const Upload = ({ bucketName, onUploadSuccess, cropProps, ...props }: ServerUploadProps) => {
  const { onRemove, onPreview, customRequest } = useServerUpload({ bucketName, onUploadSuccess });
  const arrFile = props.fileList
    ? Array.isArray(props.fileList)
      ? (props.fileList as UploadFile<FileDto>[])
      : [props.fileList]
    : undefined;
  const fileList: any[] | undefined = arrFile?.map((file, idx) =>
    typeof file === 'number'
      ? {
          uid: `file-${idx}`,
          response: { fileId: file }
        }
      : {
          ...file
        }
  );

  const Upload = (
    <UploadAntd
      prefixCls='server-upload'
      onRemove={onRemove}
      onPreview={onPreview}
      itemRender={(
        _origin: React.ReactElement,
        file: ServerUploadFile,
        _fileList: UploadFile<FileDto>[] | number[],
        actions
      ) => {
        if (isServerUploadFile(file))
          return (
            <File.Server
              className='h-full w-full'
              fileId={file.fileId}
              remove={() => {
                actions.remove();
              }}
            />
          );
        return (
          <File.Server
            className='h-full w-full'
            fileId={file.response?.fileId}
            percent={file.percent}
            isError={file.status === 'error'}
            remove={() => {
              actions.remove();
            }}
          />
        );
      }}
      {...props}
      fileList={fileList || undefined}
      customRequest={customRequest}
    />
  );
  if (props.crop)
    return (
      <ImgCrop
        {...cropProps}
        rotationSlider
        modalOk={messages.confirmButtonText}
        modalCancel={messages.cancelButtonText}
      >
        {Upload}
      </ImgCrop>
    );
  return Upload;
};

export default Upload;
