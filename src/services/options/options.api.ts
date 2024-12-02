import { createApi } from '@reduxjs/toolkit/query/react';
import { FindAllOptionsDefaultDto, FindAllOptionsDto, OptionCompactDto, ResponsePagingDto } from 'types';
import axiosBaseQuery from 'utils/base-api';

export const optionsApi = createApi({
  reducerPath: 'optionsApi',
  tagTypes: ['options', 'options_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getOptions: builder.query<ResponsePagingDto<OptionCompactDto>, FindAllOptionsDto>({
      query: (params) => ({
        url: '/options',
        method: 'get',
        params
      })
    }),
    getOptionsDefault: builder.query<ResponsePagingDto<OptionCompactDto>, FindAllOptionsDefaultDto>({
      query: (params) => ({
        url: '/options/default',
        method: 'get',
        params
      })
    })
  })
});

export const { useGetOptionsQuery, useGetOptionsDefaultQuery } = optionsApi;
