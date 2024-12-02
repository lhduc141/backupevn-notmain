import { RcFile, UploadFile } from 'antd/es/upload';
import { ServerFileWithUid } from 'components/common/upload/ServerUpload';

export function isRcFile(file: any): file is RcFile {
  if (!file) return false;
  return file instanceof File && 'uid' in file && typeof file.uid === 'string';
}

export function isServerUploadFile(file: any): file is ServerFileWithUid {
  if (!file) return false;
  return (typeof file.uid === 'string' || typeof file.uid === 'number') && typeof file.fileId === 'number';
}

export const isFile = (file: any) => file instanceof File;

export const convertFileToUploadFile = (file: RcFile): UploadFile => {
  return {
    uid: file.uid, // Use a unique identifier here
    name: file.name,
    status: 'done', // or 'uploading', 'error', etc.
    response: null, // Set this based on your upload response if needed
    size: file.size,
    type: file.type,
    originFileObj: file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate
  };
};
