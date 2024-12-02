import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  ResponseDto,
  TokenDto,
  VerifyForgotPasswordDataDto,
  VerifyForgotPasswordDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ResponseDto<TokenDto>, LoginDto>({
      query: (loginDto) => ({
        url: '/auth/login',
        method: 'post',
        data: loginDto
      })
    }),
    logout: builder.mutation<ResponseDto<TokenDto>, string>({
      query: (token) => ({
        url: '/auth/logout',
        method: 'post',
        data: {},
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    }),
    refreshToken: builder.mutation<ResponseDto<TokenDto>, TokenDto>({
      query: (tokenDto) => ({
        url: '/auth/refresh',
        method: 'post',
        data: {},
        headers: {
          authorization: `Bearer ${tokenDto.refreshToken}`
        }
      })
    }),
    changePassword: builder.mutation<ResponseDto<null>, ChangePasswordDto>({
      query: (changePassData) => ({
        url: '/auth/change_password',
        method: 'post',
        data: changePassData
      })
    }),
    forgotPassword: builder.mutation<ResponseDto<null>, ForgotPasswordDto>({
      query: (forgotData) => ({
        url: '/auth/forgot_password',
        method: 'post',
        data: forgotData
      })
    }),
    verifyForgotPassword: builder.mutation<ResponseDto<VerifyForgotPasswordDataDto>, VerifyForgotPasswordDto>({
      query: (verifyData) => ({
        url: '/auth/verify_forgot_password',
        method: 'post',
        data: verifyData,
        _ignoreNotificationError: true
      })
    }),
    resetPassword: builder.mutation<ResponseDto<null>, ResetPasswordDto>({
      query: ({ token, ...restPassData }) => ({
        url: '/auth/reset_password',
        method: 'post',
        data: restPassData,
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyForgotPasswordMutation
} = authApi;
