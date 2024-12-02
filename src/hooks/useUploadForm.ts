import { message } from 'antd';
import { ServerUploadFile } from 'components/common/upload/ServerUpload';
import { findIndex } from 'lodash';
import { useDeleteFileMutation, useUploadFileMutation } from 'services';
import { FileUpload, IconItem } from 'types';
import { FilesBucketNames } from 'utils';
import { isRcFile, isServerUploadFile } from 'utils/upload';

export function useUploadForm() {
  const [onUpload, { isLoading }] = useUploadFileMutation();
  const [onDelete, { isLoading: isLoadingDelete }] = useDeleteFileMutation();

  const onUploadFiles = async (files: Array<FileUpload | ServerUploadFile>): Promise<number[]> => {
    const uploadPromises = Array.from(files).map((file) => {
      if (!file) return null;
      if (isServerUploadFile(file)) return file.fileId;
      if ('originFileObj' in file && file.originFileObj) {
        return onUpload({
          file: file.originFileObj,
          bucketName: FilesBucketNames.PUBLIC
        })
          .unwrap()
          .then((rs) => rs.data?.fileId!)
          .catch((err) => message.error(err));
      }
      if (isRcFile(file) || file instanceof File) {
        return onUpload({
          file: file,
          bucketName: FilesBucketNames.PUBLIC
        })
          .unwrap()
          .then((rs) => rs.data?.fileId!)
          .catch((err) => message.error(err));
      }

      return 0;
    });
    try {
      const responses = await Promise.all(uploadPromises);
      return responses.filter((fileId) => fileId && typeof fileId === 'number').map((fileId) => fileId as number);
    } catch (error) {
      return [];
    }
  };

  const onDeleteFiles = async (files: number[]) => {
    for (const item of files) {
      try {
        await onDelete(item).unwrap();
      } catch (error) {}
    }
  };

  const handleMultiUpload = async (
    uploadFiles: Array<FileUpload | ServerUploadFile>,
    originFiles?: number[]
  ): Promise<number[]> => {
    if (originFiles && originFiles.length > 0) {
      const deleteFiles = originFiles.filter((file) => findIndex(uploadFiles, { fileId: file }) === -1);
      if (deleteFiles.length > 0) {
        await onDeleteFiles(deleteFiles);
      }
    }
    if (uploadFiles) {
      return await onUploadFiles(uploadFiles);
    }
    return [];
  };

  const handleUploadIcon = async (icon: IconItem, deletedId?: number) => {
    try {
      const fileResponse = await fetch(icon.path);
      const blob = await fileResponse.blob();
      const file = new File([blob], icon.key, { type: blob.type });
      const uploadResponse = await onUpload({
        bucketName: FilesBucketNames.PUBLIC,
        file
      }).unwrap();
      if (deletedId) onDelete(deletedId).unwrap();
      return uploadResponse;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleMultiUpload,
    handleUploadIcon,
    isLoading: isLoading || isLoadingDelete
  };
}
