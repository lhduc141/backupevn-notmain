import { RcFile } from 'antd/es/upload';
import { AxiosProgressEvent } from 'axios';

export type UploadFileDto = {
  file: RcFile | File | Blob | string;
  bucketName: string;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
};
