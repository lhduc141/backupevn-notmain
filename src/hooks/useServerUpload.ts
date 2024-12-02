import { GetProp, Upload, UploadFile } from 'antd';
import { useDeleteFileMutation, useUploadFileMutation } from 'services';
import { FileDto, FileUpload } from 'types';
import type { UploadRequestOption as RcCustomRequestOptions, UploadRequestError } from 'rc-upload/lib/interface';
import { message, UploadProps } from 'components';
import { messages } from 'messages';
import { configuration, FilesBucketNames } from 'utils';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type Props = {
  bucketName?: string;
  onUploadSuccess?: (value: FileDto) => void;
  accept?: string;
};

const mimeTypes: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf'
};

export function useServerUpload({ bucketName, accept, onUploadSuccess }: Props) {
  const limitSize = Number(configuration.UPLOAD_SIZE_LIMIT_MB);
  const [onUpload] = useUploadFileMutation();
  const [onDelete] = useDeleteFileMutation();

  const customRequest = async (options: RcCustomRequestOptions) => {
    const { onError, onSuccess, onProgress, file } = options;
    try {
      onUpload({
        file,
        bucketName: bucketName || FilesBucketNames.PUBLIC,
        onUploadProgress: (progress) => {
          onProgress?.({
            percent: progress?.progress ?? 0 * 100
          });
        }
      })
        .unwrap()
        .then((rs) => {
          onSuccess?.(rs.data);
          onUploadSuccess?.(rs.data);
        });
    } catch (error) {
      onError?.(error as UploadRequestError);
    }
  };
  const onRemove = async (file: UploadFile<FileDto> | number) => {
    const fileId = typeof file === 'number' ? file : file.response?.fileId;
    if (fileId) {
      await onDelete(fileId)
        .unwrap()
        .then((rs) => {
          return true;
        });
    }
    return true;
  };

  const onPreview = async (file: UploadFile<FileDto>) => {
    let src = file.response?.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const beforeUpload = (file: FileUpload) => {
    if (file.size && file.size / 1000 / 1000 >= limitSize) {
      message.error(messages.fileSizeIsMax(limitSize + 'MB'));
      return Upload.LIST_IGNORE;
    }
    if (!accept) return true;

    const acceptedFormats = accept?.replaceAll('.', '').replaceAll(' ', '').split(',') || [];
    const fileType = file.type || ''; // MIME type
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''; // File extension
    console.log(fileExtension, acceptedFormats);
    const isValidType = acceptedFormats.some(
      (format) =>
        (format in mimeTypes &&
          mimeTypes[format as keyof typeof mimeTypes]?.toLowerCase() === fileType.toLowerCase()) ||
        format === fileExtension
    );

    if (!isValidType) {
      message.error(messages.fileInvalidFormat(acceptedFormats.join(', ').toUpperCase()));
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  return {
    onPreview,
    onRemove,
    customRequest,
    beforeUpload
  };
}
