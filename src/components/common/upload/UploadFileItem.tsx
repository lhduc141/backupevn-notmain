import { UploadFile } from 'antd';
import { RcFile } from 'antd/es/upload';
import { twMerge } from 'tailwind-merge';
import { isRcFile, isServerUploadFile } from 'utils/upload';
import { File } from '../files';
import { ServerFileWithUid } from './ServerUpload';
type UploadFileItemProps = {
  file: UploadFile | ServerFileWithUid | RcFile;
  className?: string;
  remove?: (fileId?: number) => void;
};
const UploadFileItem: React.FC<UploadFileItemProps> = ({ file, className, remove }) => {
  if (isServerUploadFile(file))
    return (
      <File.Server
        className={twMerge('h-full w-full', className)}
        fileId={file.fileId}
        remove={
          remove
            ? (fileId) => {
                remove?.(fileId);
              }
            : undefined
        }
        iconSize={40}
      />
    );
  if (isRcFile(file)) {
    const url = URL.createObjectURL(file as RcFile);
    return (
      <File
        url={url}
        type={file.type}
        key={file.uid}
        name={file.name}
        remove={remove ? () => remove() : undefined}
        fileSize={file.size}
        className={className}
        iconSize={40}
      />
    );
  }
  if (file.originFileObj) {
    const url = URL.createObjectURL(file.originFileObj!);
    return (
      <File
        url={url}
        type={file.type}
        key={file.uid}
        name={file.name}
        remove={remove ? () => remove() : undefined}
        fileSize={file.size}
        className={className}
        iconSize={40}
      />
    );
  }

  return null;
};
export default UploadFileItem;
