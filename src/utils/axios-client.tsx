import { message } from 'antd';
import { WarningCircleOutlinedIcon } from 'assets';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ROUTE } from 'routes/constants';
import { ResponseDto, TokenDto } from 'types';
import { configuration } from './configuration';
import { LOCAL_STORAGE_KEY } from './constants';
import { HTTP_STATUS } from './enums';

let response: Promise<AxiosResponse<TokenDto> | null> | null = null;

const systemErrorMessage = (content: string) => {
  message.open({
    type: 'error',
    content,
    icon: <WarningCircleOutlinedIcon className='text-white' />,
    className: 'system-message'
  });
};

export async function refreshTokenApi(token: string) {
  if (response) return response;
  response = axiosClient
    .post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((rs) => {
      if (rs.data) {
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, rs.data.accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, rs.data.refreshToken);
      }
      setTimeout(() => {
        response = null;
      }, 500);
      return rs;
    })
    .catch(() => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
      window.location.href = ROUTE.LOGIN;
      return null;
    });

  return response;
}
export type AxiosRequestConfig = InternalAxiosRequestConfig<any> & {
  _retry?: boolean;
  _ignoreRefresh?: boolean;
  _ignoreNotificationError?: boolean;
};

const axiosClient = axios.create({
  baseURL: `${configuration.API_URL}/`,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (accessToken) config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    if (
      error?.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      originalRequest.url !== '/auth/refresh' &&
      !originalRequest?._ignoreRefresh &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

      if (refreshToken) {
        const responseToken = await refreshTokenApi(refreshToken);
        if (responseToken && responseToken.data) {
          originalRequest.headers.Authorization = `Bearer ${responseToken.data.accessToken}`;
          return axiosClient.request(originalRequest);
        }
      }
    } else if (!originalRequest?._ignoreNotificationError) {
      const data = error?.response?.data as ResponseDto<null>;
      const errorMessage = data?.message?.toString() || error?.response?.statusText || error?.message;
      systemErrorMessage(`${errorMessage}`);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
