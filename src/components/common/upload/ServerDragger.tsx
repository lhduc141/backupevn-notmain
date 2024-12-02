import { Button, Typography, Upload as UploadAntd } from 'antd';
import { UploadFile } from 'antd/es/upload';
import React from 'react';
import { FileDto } from 'types';
import { isServerUploadFile } from 'utils/upload';
import { File } from '../files';
import { ServerUploadFile, ServerUploadProps } from './ServerUpload';
import { twMerge } from 'tailwind-merge';
import { UploadIcon } from 'assets';
import { messages } from 'messages';
import { useServerUpload } from 'hooks';
import ImgCrop from 'antd-img-crop';

type ServerDraggerProps = ServerUploadProps;

const ServerDragger = ({ bucketName, onUploadSuccess, cropProps, accept, ...props }: ServerDraggerProps) => {
  const { onRemove, onPreview, customRequest, beforeUpload } = useServerUpload({ bucketName, accept, onUploadSuccess });
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
  const Dragger = (
    <UploadAntd.Dragger
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
      accept={accept}
      beforeUpload={beforeUpload}
    >
      <div className={twMerge('flex flex-col items-center')}>
        <UploadIcon className='mb-4 h-14 w-14 text-subTextColor' />
        <Typography.Text>{messages.draggerUpload}</Typography.Text>
        <Typography.Text type='secondary' className='text-xs'>
          {messages.rulesUploadFile(accept?.replaceAll('.', '').toUpperCase() ?? '', '5 MB')}
        </Typography.Text>
        <Button type='primary' ghost size='small' className='mt-4 h-8 w-28 bg-white text-sm'>
          {messages.selectFile}
        </Button>
      </div>
    </UploadAntd.Dragger>
  );
  if (props.crop)
    return (
      <ImgCrop
        {...cropProps}
        rotationSlider
        modalOk={messages.confirmButtonText}
        modalCancel={messages.cancelButtonText}
      >
        {Dragger}
      </ImgCrop>
    );
  return Dragger;
};

export default ServerDragger;
