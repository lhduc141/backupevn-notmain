import { createApi } from '@reduxjs/toolkit/query/react';
import { CustomerCompactDto, CustomerDto, FindAllCustomerDto, ResponseDto, ResponsePagingDto } from 'types';
import axiosBaseQuery from 'utils/base-api';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  tagTypes: ['customers', 'customer_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getCustomer: builder.query<ResponsePagingDto<CustomerDto>, FindAllCustomerDto>({
      query: (params) => ({
        url: '/customers',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ customerId }) => ({
              type: 'customers',
              id: customerId
            }))
          : ['customers']
    }),

    getCustomerDetail: builder.query<ResponseDto<CustomerDto>, number>({
      query: (customerId) => ({
        url: `/customers/${customerId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'customers', id: result.data.customerId }] : [])
    }),

    getCustomerOptions: builder.query<ResponsePagingDto<CustomerCompactDto>, FindAllCustomerDto>({
      query: (params) => ({
        url: '/customers/options',
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
        return (
          currentArg?.keyword !== previousArg?.keyword ||
          currentArg?.pageIndex !== previousArg?.pageIndex ||
          currentArg?.customerCode !== previousArg?.customerCode ||
          currentArg?.customerName !== previousArg?.customerName
        );
      },
      providesTags: ['customers']
    })
  })
});

export const { useGetCustomerQuery, useGetCustomerDetailQuery, useGetCustomerOptionsQuery } = customersApi;
