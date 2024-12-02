import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateTicketCancelReasonDto,
  FindAllTicketCancelReasonDto,
  ResponseDto,
  ResponsePagingDto,
  TicketCancelReasonDto,
  UpdateTicketCancelReasonDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const ticketCancelReasonsApi = createApi({
  reducerPath: 'ticketCancelReasonsApi',
  tagTypes: ['ticket_cancel_reasons', 'ticket_cancel_reasons_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getTicketCancelReasons: builder.query<ResponsePagingDto<TicketCancelReasonDto>, FindAllTicketCancelReasonDto>({
      query: (params) => ({
        url: '/ticket_cancel_reasons',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => JSON.stringify(queryArgs),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ ticketCancelReasonId }) => ({
              type: 'ticket_cancel_reasons',
              id: ticketCancelReasonId
            }))
          : ['ticket_cancel_reasons']
    }),

    getTicketCancelReasonsActive: builder.query<ResponsePagingDto<TicketCancelReasonDto>, FindAllTicketCancelReasonDto>(
      {
        query: (params) => ({
          url: '/ticket_cancel_reasons/active',
          method: 'get',
          params
        }),
        providesTags: (result) =>
          result && result.data.rows.length > 0
            ? result.data.rows.map(({ ticketCancelReasonId }) => ({
                type: 'ticket_cancel_reasons',
                id: ticketCancelReasonId
              }))
            : ['ticket_cancel_reasons']
      }
    ),

    getTicketCancelReasonDetail: builder.query<ResponseDto<TicketCancelReasonDto>, number>({
      query: (ticketCancelReasonId) => ({
        url: `/ticket_cancel_reasons/${ticketCancelReasonId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'ticket_cancel_reasons', id: result.data.ticketCancelReasonId }] : []
    }),

    createTicketCancelReason: builder.mutation<ResponseDto<TicketCancelReasonDto>, CreateTicketCancelReasonDto>({
      query: (newSchedule) => ({
        url: '/ticket_cancel_reasons',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['ticket_cancel_reasons']
    }),
    updateTicketCancelReason: builder.mutation<ResponseDto<TicketCancelReasonDto>, UpdateTicketCancelReasonDto>({
      query: ({ ticketCancelReasonId, ...updateSchedule }) => ({
        url: `/ticket_cancel_reasons/${ticketCancelReasonId}`,
        method: 'patch',
        data: updateSchedule
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'ticket_cancel_reasons', id: param.ticketCancelReasonId },
        { type: 'ticket_cancel_reasons_detail', id: param.ticketCancelReasonId }
      ]
    }),
    deleteTicketCancelReason: builder.mutation<ResponseDto<null>, number>({
      query: (ticketCancelReasonId) => ({
        url: `/ticket_cancel_reasons/${ticketCancelReasonId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'ticket_cancel_reasons', id: param },
        { type: 'ticket_cancel_reasons_detail', id: param }
      ]
    })
  })
});

export const {
  useGetTicketCancelReasonsQuery,
  useGetTicketCancelReasonDetailQuery,
  useCreateTicketCancelReasonMutation,
  useUpdateTicketCancelReasonMutation,
  useDeleteTicketCancelReasonMutation
} = ticketCancelReasonsApi;
