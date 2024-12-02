export type FileDto = {
  fileId: number;
  url: string;
  bucketName: string;
  objectName: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
  originalName?: string;
};
