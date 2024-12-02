


import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseDto, ResponsePagingDto } from "types";
import { TicketDto, FindAllTicketDto, CreateTicketDto } from "types/dto/ticket";

import axiosBaseQuery from "utils/base-api";

export const ticketsApi = createApi({
    reducerPath: 'ticketApi',
    tagTypes: ['tickets', 'ticket_detail'],
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getTicketsInProgress: builder.query<ResponsePagingDto<TicketDto>, FindAllTicketDto>({
            query: (params) => ({
                url: '/tickets/dtv/inProgress',
                method: 'get',
                params
            }),
            providesTags: (result) =>
                result && result.data.rows.length
                    ? result.data.rows.map(({customerCode}) => ({
                        type: 'tickets',
                        id: customerCode
                      }))
                    : ['tickets']       
        }),
        getTicketsCompleted: builder.query<ResponsePagingDto<TicketDto>, FindAllTicketDto>({
            query: (params) => ({
                url: '/tickets/dtv/completed',
                method: 'get',
                params
            }),
            providesTags: (result) =>
                result && result.data.rows.length
                    ? result.data.rows.map(({customerCode}) => ({
                        type: 'tickets',
                        id: customerCode
                      }))
                    : ['tickets']       
        }),
        
        getTicketDetail: builder.query<ResponseDto<TicketDto>, number>({
            query: (ticketId) => ({
                url: `/tickets/${ticketId}`,
                method: 'get'
            }),
            providesTags: (result) =>
                result?.data ? [{ type: 'ticket_detail', id: result.data.ticketId}] : []
        }),

        createTicket: builder.mutation<ResponseDto<TicketDto>, CreateTicketDto>({
            query: (newTicket) => ({
                url: '/tickets/dtv/create',
                method: 'post',
                data: newTicket
            }),
            invalidatesTags: ['tickets']
        })
    
    })
});

export const {
    useGetTicketsInProgressQuery,
    useGetTicketsCompletedQuery,
    useCreateTicketMutation,
    useGetTicketDetailQuery,
} = ticketsApi;





