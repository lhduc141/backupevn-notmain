import { Tooltip, Upload as UploadAntd } from 'antd';
import { UploadFile, UploadProps as UploadPropsAntd } from 'antd/es/upload';
import { FileDto } from 'types';
import { ServerFileWithUid } from './ServerUpload';
import UploadFileItem from './UploadFileItem';
import { useServerUpload } from 'hooks';
import { messages } from 'messages';

export type UploadProps = UploadPropsAntd & {
  onUploadSuccess?: (value: FileDto) => void;
  itemClassName?: string;
};

const Upload = ({ onUploadSuccess, itemClassName, accept, maxCount, ...props }: UploadProps) => {
  const { beforeUpload } = useServerUpload({ accept });
  const fileList = props.fileList
    ? Array.isArray(props.fileList)
      ? (props.fileList as UploadFile[])
      : [props.fileList]
    : undefined;

  return (
    <UploadAntd
      itemRender={(
        _origin: React.ReactElement,
        file: UploadFile | ServerFileWithUid,
        _fileList: Array<UploadFile | number>,
        actions
      ) => {
        return <UploadFileItem file={file} remove={() => actions.remove()} />;
      }}
      prefixCls='custom-upload'
      customRequest={() => true}
      fileList={fileList || undefined}
      accept={accept}
      maxCount={maxCount}
      {...props}
      beforeUpload={beforeUpload}
      disabled={props.disabled || maxCount === fileList?.length}
    >
      {' '}
      <Tooltip
        title={
          maxCount && maxCount === fileList?.length ? messages.maxCountUpload(fileList?.length ?? 0, maxCount) : ''
        }
      >
        {props.children}
      </Tooltip>
    </UploadAntd>
  );
};

export default Upload;
