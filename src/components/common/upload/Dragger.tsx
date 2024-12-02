import { Button, Tooltip, Typography, Upload as UploadAntd } from 'antd';
import { UploadFile, UploadProps as UploadPropsAntd } from 'antd/es/upload';
import { FileDto } from 'types';
import { ServerFileWithUid } from './ServerUpload';
import UploadFileItem from './UploadFileItem';
import { useServerUpload } from 'hooks';
import { twMerge } from 'tailwind-merge';
import { UploadIcon } from 'assets';
import { messages } from 'messages';

export type DraggerProps = UploadPropsAntd & {
  onUploadSuccess?: (value: FileDto) => void;
  itemClassName?: string;
};

const Dragger = ({ onUploadSuccess, itemClassName, accept, maxCount, ...props }: DraggerProps) => {
  const { beforeUpload } = useServerUpload({ accept });
  const fileList = props.fileList
    ? Array.isArray(props.fileList)
      ? (props.fileList as UploadFile[])
      : [props.fileList]
    : undefined;

  return (
    <UploadAntd.Dragger
      itemRender={(
        _origin: React.ReactElement,
        file: UploadFile | ServerFileWithUid,
        _fileList: Array<UploadFile | number>,
        actions
      ) => {
        return <UploadFileItem file={file} remove={() => actions.remove()} />;
      }}
      prefixCls='custom-dragger'
      customRequest={() => true}
      fileList={fileList || undefined}
      accept={accept}
      maxCount={maxCount}
      {...props}
      beforeUpload={beforeUpload}
      disabled={props.disabled || maxCount === fileList?.length}
    >
      <Tooltip
        title={
          maxCount && maxCount === fileList?.length ? messages.maxCountUpload(fileList?.length ?? 0, maxCount) : ''
        }
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
      </Tooltip>
    </UploadAntd.Dragger>
  );
};

export default Dragger;
