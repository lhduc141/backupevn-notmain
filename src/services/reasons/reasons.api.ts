import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateReasonDto,
  FindAllDto,
  FindAllReasonDto,
  ReasonCompactDto,
  ReasonDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateReasonDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const reasonsApi = createApi({
  reducerPath: 'reasonsApi',
  tagTypes: ['reasons', 'reasons_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getReasons: builder.query<ResponsePagingDto<ReasonDto>, FindAllReasonDto>({
      query: (params) => ({
        url: '/reasons',
        method: 'get',
        params
      }),

      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ reasonId }) => ({
              type: 'reasons',
              id: reasonId
            }))
          : ['reasons']
    }),

    getReasonsOptions: builder.query<ResponsePagingDto<ReasonCompactDto>, FindAllDto>({
      query: (params) => ({
        url: '/reasons/options',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
        currentCache.data.count = newItems.data.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ reasonId }) => ({
              type: 'reasons',
              id: reasonId
            }))
          : ['reasons']
    }),

    getReasonDetail: builder.query<ResponseDto<ReasonDto>, number>({
      query: (reasonId) => ({ url: `/reasons/${reasonId}`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'reasons_detail', id: result.data.reasonId }] : [])
    }),

    createReason: builder.mutation<ResponseDto<ReasonDto>, CreateReasonDto>({
      query: (newReason) => ({
        url: '/reasons',
        method: 'post',
        data: newReason
      }),
      invalidatesTags: ['reasons']
    }),
    updateReason: builder.mutation<ResponseDto<ReasonDto>, UpdateReasonDto>({
      query: ({ reasonId, ...updateReason }) => ({
        url: `/reasons/${reasonId}`,
        method: 'patch',
        data: updateReason
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'reasons', id: param.reasonId },
        { type: 'reasons_detail', id: param.reasonId }
      ]
    }),
    deleteReason: builder.mutation<ResponseDto<null>, number>({
      query: (reasonId) => ({
        url: `/reasons/${reasonId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'reasons', id: param }]
    })
  })
});

export const {
  useLazyGetReasonsOptionsQuery,
  useGetReasonsOptionsQuery,
  useGetReasonsQuery,
  useGetReasonDetailQuery,
  useCreateReasonMutation,
  useUpdateReasonMutation,
  useDeleteReasonMutation
} = reasonsApi;
