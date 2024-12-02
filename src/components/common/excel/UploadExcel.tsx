import { Button, Typography, Upload, UploadProps } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import type { UploadRequestOption as RcCustomRequestOptions, UploadRequestError } from 'rc-upload/lib/interface';
import { isStringOrNumberMatrix, isValidJson, readFileExcel } from 'utils';
import Excel, { ExcelProps } from './Excel';
import { messages } from 'messages';
import { CloseIcon, ExcelFileIcon, UploadIcon } from 'assets';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

type UploadExcelProps = Omit<UploadProps, 'children'> & {
  excelProps?: Omit<ExcelProps, 'data'>;
};

export type UploadExcelDataType = {
  excelData: (string | number)[][];
};

const UploadExcel = ({ excelProps, ...props }: UploadExcelProps) => {
  const [fileOrigin, setFileOrigin] = useState<RcFile>();
  const fileList = props.fileList ? (Array.isArray(props.fileList) ? props.fileList : [props.fileList]) : undefined;

  const handleUpload = async (options: RcCustomRequestOptions) => {
    const { onError, onSuccess, file } = options;
    await readFileExcel(file as RcFile)
      .then((data) => {
        setFileOrigin(file as RcFile);
        onSuccess?.({
          excelData: data
        });
      })
      .catch((error) => {
        setFileOrigin(undefined);
        onError?.(error as UploadRequestError);
      });
  };
  const file = fileList?.[0];
  if (file && typeof file === 'string' && isStringOrNumberMatrix(JSON.parse(file))) {
    return (
      <div>
        <div
          className='relative left-1/2 mb-6 flex h-16 -translate-x-1/2 items-center gap-4 rounded-lg bg-colorBgSmallModal pl-4 pr-[52px]'
          style={{ width: excelProps?.minWidth }}
        >
          <ExcelFileIcon />
          <Typography.Text>{fileOrigin?.name}</Typography.Text>
          <Button
            onClick={() => {
              props?.onRemove?.(file);
              setFileOrigin(undefined);
            }}
            className='absolute right-2 h-8 w-8'
            shape='circle'
            type='text'
            icon={<CloseIcon />}
          />
        </div>
        <Excel {...excelProps} data={JSON.parse(file)} />
      </div>
    );
  }
  return (
    <>
      <Upload.Dragger
        {...props}
        multiple={false}
        fileList={fileList}
        itemRender={() => null}
        accept='.xls,.xlsx,.csv'
        customRequest={handleUpload}
        className={twMerge('w-full')}
        prefixCls='excel-upload'
      >
        <div className={twMerge('flex flex-col items-center')}>
          <UploadIcon className='mb-4 h-14 w-14 text-subTextColor' />
          <Typography.Text>{messages.draggerUpload}</Typography.Text>
          <Typography.Text type='secondary' className='text-xs'>
            {messages.rulesUploadExcel}
          </Typography.Text>
          <Button type='primary' ghost size='small' className='mt-4 h-8 w-28 bg-white text-sm'>
            {messages.selectFile}
          </Button>
        </div>
      </Upload.Dragger>
    </>
  );
};
export default UploadExcel;
