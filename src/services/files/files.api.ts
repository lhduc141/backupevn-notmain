import { createApi } from '@reduxjs/toolkit/query/react';
import { FileDto, ResponseDto, UpdateFileDto, UploadFileDto } from 'types';
import axiosBaseQuery from 'utils/base-api';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  tagTypes: ['files'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getFile: builder.query<ResponseDto<FileDto>, number>({
      query: (fileId) => ({
        url: `/files/${fileId}`,
        method: 'get',
        _ignoreNotificationError: true
      }),

      providesTags: (result) => (result ? [{ type: 'files', id: result.data.fileId }] : [])
    }),
    uploadFile: builder.mutation<ResponseDto<FileDto>, UploadFileDto>({
      query: ({ bucketName, file, onUploadProgress }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucketName', bucketName);

        return {
          url: '/files',
          method: 'post',
          data: formData,
          onUploadProgress,
          headers: { 'Content-Type': 'multipart/form-data' }
        };
      }
    }),

    updateFile: builder.mutation<ResponseDto<FileDto>, UpdateFileDto>({
      query: ({ fileId, file, onUploadProgress }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/files/${fileId}`,
          method: 'patch',
          data: formData,
          onUploadProgress,
          headers: { 'Content-Type': 'multipart/form-data' }
        };
      },
      invalidatesTags: (_result, _error, param) => [{ type: 'files', id: param.fileId }]
    }),
    deleteFile: builder.mutation<ResponseDto<FileDto>, number>({
      query: (fileId) => ({
        url: `/files/${fileId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'files', id: param }]
    })
  })
});

export const {
  useUploadFileMutation,
  useDeleteFileMutation,
  useLazyGetFileQuery,
  useGetFileQuery,
  useUpdateFileMutation
} = filesApi;
