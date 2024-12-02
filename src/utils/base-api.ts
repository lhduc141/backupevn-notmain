import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { ResponseDto } from 'types';
import axiosClient from './axios-client';

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    onUploadProgress?: AxiosRequestConfig['onDownloadProgress'];
    headers?: AxiosRequestConfig['headers']; // Allow custom headers,
    _retry?: boolean;
    _ignoreRefresh?: boolean;
    _ignoreNotificationError?: boolean;
  },
  unknown,
  ResponseDto<null>
> = async (axiosConfig) => {
  try {
    const result = await axiosClient(axiosConfig);
    return { data: result };
  } catch (axiosError) {
    let err = axiosError as AxiosError<ResponseDto<null>>;
    return {
      error: err.response?.data
    };
  }
};

export default axiosBaseQuery;
