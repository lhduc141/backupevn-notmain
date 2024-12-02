import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateInternalAnnouncementDto,
  FindAllInternalAnnouncementActiveDto,
  FindAllInternalAnnouncementDto,
  FindAllInternalAnnouncementStatisticDto,
  InternalAnnouncementActiveDto,
  InternalAnnouncementDto,
  InternalAnnouncementStatisticDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateInternalAnnouncementDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const internalAnnouncementsApi = createApi({
  reducerPath: 'internalAnnouncementsApi',
  tagTypes: [
    'internal_announcements',
    'internal_announcements_deleted',
    'internal_announcements_detail',
    'internal_announcements_deleted_detail',
    'internal_announcements_statistics',
    'internal_announcements_unread_count'
  ],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getInternalAnnouncements: builder.query<ResponsePagingDto<InternalAnnouncementDto>, FindAllInternalAnnouncementDto>(
      {
        query: (params) => ({
          url: '/internal_announcements',
          method: 'get',
          params
        }),
        providesTags: (result) =>
          result && result.data.rows.length > 0
            ? result.data.rows.map(({ internalAnnouncementId }) => ({
                type: 'internal_announcements',
                id: internalAnnouncementId
              }))
            : ['internal_announcements']
      }
    ),

    getInternalAnnouncementsDeleted: builder.query<
      ResponsePagingDto<InternalAnnouncementDto>,
      FindAllInternalAnnouncementDto
    >({
      query: (params) => ({
        url: '/internal_announcements/deleted',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ internalAnnouncementId }) => ({
              type: 'internal_announcements_deleted',
              id: internalAnnouncementId
            }))
          : ['internal_announcements_deleted']
    }),

    getInternalAnnouncementsStatistics: builder.query<
      ResponsePagingDto<InternalAnnouncementStatisticDto>,
      FindAllInternalAnnouncementStatisticDto
    >({
      query: (params) => ({
        url: `/internal_announcements/${params.internalAnnouncementId}/statistics`,
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ internalAnnouncementId }) => ({
              type: 'internal_announcements_statistics',
              id: internalAnnouncementId
            }))
          : ['internal_announcements_statistics']
    }),

    getInternalAnnouncementsActive: builder.query<
      ResponsePagingDto<InternalAnnouncementDto>,
      FindAllInternalAnnouncementActiveDto
    >({
      query: (params) => ({
        url: '/internal_announcements/active',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
        currentCache.data.count = newItems.data.count;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      },
      providesTags: ['internal_announcements']
    }),

    getInternalAnnouncementDetail: builder.query<ResponseDto<InternalAnnouncementDto>, number>({
      query: (internalAnnouncementId) => ({
        url: `/internal_announcements/${internalAnnouncementId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'internal_announcements_detail', id: result.data.internalAnnouncementId }] : []
    }),

    getInternalAnnouncementDeletedDetail: builder.query<ResponseDto<InternalAnnouncementDto>, number>({
      query: (internalAnnouncementId) => ({
        url: `/internal_announcements/deleted/${internalAnnouncementId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'internal_announcements_deleted_detail', id: result.data.internalAnnouncementId }] : []
    }),

    getInternalAnnouncementDetailActive: builder.query<ResponseDto<InternalAnnouncementActiveDto>, number>({
      query: (internalAnnouncementId) => ({
        url: `/internal_announcements/active/${internalAnnouncementId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'internal_announcements_detail', id: result.data.internalAnnouncementId }] : []
    }),

    createInternalAnnouncement: builder.mutation<ResponseDto<InternalAnnouncementDto>, CreateInternalAnnouncementDto>({
      query: (newSchedule) => ({
        url: '/internal_announcements',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['internal_announcements']
    }),
    updateInternalAnnouncement: builder.mutation<ResponseDto<InternalAnnouncementDto>, UpdateInternalAnnouncementDto>({
      query: ({ internalAnnouncementId, ...updateSchedule }) => ({
        url: `/internal_announcements/${internalAnnouncementId}`,
        method: 'patch',
        data: updateSchedule
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'internal_announcements', id: param.internalAnnouncementId },
        { type: 'internal_announcements_detail', id: param.internalAnnouncementId }
      ]
    }),

    confirmInternalAnnouncement: builder.mutation<ResponseDto<InternalAnnouncementDto>, number>({
      query: (internalAnnouncementId) => ({
        url: `/internal_announcements/confirm/${internalAnnouncementId}`,
        method: 'put'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'internal_announcements', id: param }
        // { type: 'internal_announcements_detail', id: param }
      ],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
          dispatch(
            internalAnnouncementsApi.util.updateQueryData(
              'getInternalAnnouncementDetailActive',
              result.data.internalAnnouncementId,
              (draft) => {
                Object.assign(draft, result);
              }
            )
          );
        } catch {}
      }
    }),

    deleteInternalAnnouncement: builder.mutation<ResponseDto<any>, number>({
      query: (internalAnnouncementId) => ({
        url: `/internal_announcements/${internalAnnouncementId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'internal_announcements', id: param }]
    }),

    getInternalAnnouncementUnreadCound: builder.query<ResponseDto<number>, void>({
      query: (params) => ({
        url: '/internal_announcements/active/unread_count',
        method: 'get',
        params
      }),
      providesTags: (result) => (result?.data ? [{ type: 'internal_announcements_unread_count' }] : [])
    })
  })
});

export const {
  useGetInternalAnnouncementDeletedDetailQuery,
  useGetInternalAnnouncementsDeletedQuery,
  useGetInternalAnnouncementsStatisticsQuery,
  useGetInternalAnnouncementDetailActiveQuery,
  useLazyGetInternalAnnouncementsActiveQuery,
  useGetInternalAnnouncementsActiveQuery,
  useGetInternalAnnouncementsQuery,
  useGetInternalAnnouncementDetailQuery,
  useCreateInternalAnnouncementMutation,
  useUpdateInternalAnnouncementMutation,
  useDeleteInternalAnnouncementMutation,
  useConfirmInternalAnnouncementMutation,
  useGetInternalAnnouncementUnreadCoundQuery
} = internalAnnouncementsApi;
