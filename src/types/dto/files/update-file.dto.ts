import { UploadFileDto } from './upload-file.dto';

export type UpdateFileDto = Pick<UploadFileDto, 'file' | 'onUploadProgress'> & {
  fileId: number;
};
