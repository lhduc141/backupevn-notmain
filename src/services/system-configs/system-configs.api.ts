import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseDto } from 'types';
import { SystemConfigDto, UpdateSystemConfigDto } from 'types/dto/system-configs';
import axiosBaseQuery from 'utils/base-api';

export const systemConfigsApi = createApi({
  reducerPath: 'systemConfigsApi',
  tagTypes: ['system_configs'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    //user-profile
    getSystemConfigs: builder.query<ResponseDto<SystemConfigDto>, void>({
      query: () => ({
        url: '/system_configs',
        method: 'get'
      }),
      providesTags: [{ type: 'system_configs' }]
    }),

    updateSystemConfig: builder.mutation<ResponseDto<null>, UpdateSystemConfigDto>({
      query: (updateData) => ({
        url: `/system_configs`,
        method: 'patch',
        data: updateData
      }),
      invalidatesTags: [{ type: 'system_configs' }]
    })
  })
});

export const { useGetSystemConfigsQuery, useUpdateSystemConfigMutation } = systemConfigsApi;
