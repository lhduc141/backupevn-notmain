import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateTicketSampleDto,
  FindAllTicketSampleActiveDto,
  FindAllTicketSampleDto,
  ResponseDto,
  ResponsePagingDto,
  TicketSampleDto,
  UpdateTicketSampleDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const ticketSamplesApi = createApi({
  reducerPath: 'ticketSamplesApi',
  tagTypes: ['ticket_samples', 'ticket_samples_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getTicketSamples: builder.query<ResponsePagingDto<TicketSampleDto>, FindAllTicketSampleDto>({
      query: (params) => ({
        url: '/ticket_samples',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ ticketSampleId }) => ({
              type: 'ticket_samples',
              id: ticketSampleId
            }))
          : ['ticket_samples']
    }),

    getTicketSamplesActive: builder.query<ResponsePagingDto<TicketSampleDto>, FindAllTicketSampleActiveDto>({
      query: (params) => ({
        url: '/ticket_samples/active',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ ticketSampleId }) => ({
              type: 'ticket_samples',
              id: ticketSampleId
            }))
          : ['ticket_samples']
    }),

    getTicketSampleDetail: builder.query<ResponseDto<TicketSampleDto>, number>({
      query: (ticketSampleId) => ({
        url: `/ticket_samples/${ticketSampleId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'ticket_samples', id: result.data.ticketSampleId }] : [])
    }),

    createTicketSample: builder.mutation<ResponseDto<TicketSampleDto>, CreateTicketSampleDto>({
      query: (newSchedule) => ({
        url: '/ticket_samples',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['ticket_samples']
    }),
    updateTicketSample: builder.mutation<ResponseDto<TicketSampleDto>, UpdateTicketSampleDto>({
      query: ({ ticketSampleId, ...updateSchedule }) => ({
        url: `/ticket_samples/${ticketSampleId}`,
        method: 'patch',
        data: updateSchedule
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'ticket_samples', id: param.ticketSampleId },
        { type: 'ticket_samples_detail', id: param.ticketSampleId }
      ]
    }),
    deleteTicketSample: builder.mutation<ResponseDto<null>, number>({
      query: (ticketSampleId) => ({
        url: `/ticket_samples/${ticketSampleId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'ticket_samples', id: param },
        { type: 'ticket_samples_detail', id: param }
      ]
    })
  })
});

export const {
  useGetTicketSamplesQuery,
  useGetTicketSampleDetailQuery,
  useCreateTicketSampleMutation,
  useUpdateTicketSampleMutation,
  useDeleteTicketSampleMutation
} = ticketSamplesApi;
