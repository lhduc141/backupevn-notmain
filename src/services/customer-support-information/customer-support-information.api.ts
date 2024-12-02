import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateCustomerSupportInformationDto,
  CustomerSupportInformationDto,
  FindAllCustomerSupportInformationDto,
  FindAllCustomerSupportInformationFormatContentDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateCustomerSupportInformationDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const customerSupportInformationApi = createApi({
  reducerPath: 'customerSupportInformationApi',
  tagTypes: [
    'customer_support_information',
    'customer_support_information_detail',
    'customer_support_information_format_content'
  ],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getCustomerSupportInformation: builder.query<
      ResponsePagingDto<CustomerSupportInformationDto>,
      FindAllCustomerSupportInformationDto
    >({
      query: (params) => ({
        url: '/customer_support_information',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ customerSupportInformationId }) => ({
              type: 'customer_support_information',
              id: customerSupportInformationId
            }))
          : ['customer_support_information']
    }),

    getCustomerSupportInformationActive: builder.query<
      ResponsePagingDto<Omit<CustomerSupportInformationDto, 'content'>>,
      void
    >({
      query: (params) => ({
        url: '/customer_support_information/active',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ customerSupportInformationId }) => ({
              type: 'customer_support_information',
              id: customerSupportInformationId
            }))
          : ['customer_support_information']
    }),
    getCustomerSupportInformationDetail: builder.query<ResponseDto<CustomerSupportInformationDto>, number>({
      query: (customerSupportInformationId) => ({
        url: `/customer_support_information/${customerSupportInformationId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'customer_support_information', id: result.data.customerSupportInformationId }] : []
    }),
    getCustomerSupportInformationActiveDetail: builder.query<ResponseDto<CustomerSupportInformationDto>, number>({
      query: (customerSupportInformationId) => ({
        url: `/customer_support_information/active/${customerSupportInformationId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'customer_support_information', id: result.data.customerSupportInformationId }] : []
    }),

    getCustomerSupportInformationFormatContent: builder.query<
      ResponsePagingDto<string[]>,
      FindAllCustomerSupportInformationFormatContentDto
    >({
      query: ({ customerSupportInformationId, ...params }) => ({
        url: `/customer_support_information/${customerSupportInformationId}/content`,
        method: 'get',
        params
      }),
      providesTags: (result, _, params) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(() => ({
              type: 'customer_support_information_format_content',
              id: params.customerSupportInformationId
            }))
          : ['customer_support_information_format_content']
    }),

    getCustomerSupportInformationFormatContentActive: builder.query<
      ResponsePagingDto<string[]>,
      FindAllCustomerSupportInformationFormatContentDto
    >({
      query: ({ customerSupportInformationId, ...params }) => ({
        url: `/customer_support_information/active/${customerSupportInformationId}/content`,
        method: 'get',
        params
      }),
      providesTags: (result, _, params) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(() => ({
              type: 'customer_support_information_format_content',
              id: params.customerSupportInformationId
            }))
          : ['customer_support_information_format_content']
    }),

    createCustomerSupportInformation: builder.mutation<
      ResponseDto<CustomerSupportInformationDto>,
      CreateCustomerSupportInformationDto
    >({
      query: (newCustomerSupportInformation) => ({
        url: '/customer_support_information',
        method: 'post',
        data: newCustomerSupportInformation
      }),
      invalidatesTags: ['customer_support_information']
    }),
    updateCustomerSupportInformation: builder.mutation<
      ResponseDto<CustomerSupportInformationDto>,
      UpdateCustomerSupportInformationDto
    >({
      query: ({ customerSupportInformationId, ...updateCustomerSupportInformation }) => ({
        url: `/customer_support_information/${customerSupportInformationId}`,
        method: 'patch',
        data: updateCustomerSupportInformation
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'customer_support_information', id: param.customerSupportInformationId },
        { type: 'customer_support_information_detail', id: param.customerSupportInformationId }
      ]
    }),
    deleteCustomerSupportInformation: builder.mutation<void, number>({
      query: (customerSupportInformationId) => ({
        url: `/customer_support_information/${customerSupportInformationId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'customer_support_information', id: param },
        { type: 'customer_support_information_detail', id: param }
      ]
    })
  })
});

export const {
  useGetCustomerSupportInformationActiveQuery,
  useGetCustomerSupportInformationQuery,
  useGetCustomerSupportInformationDetailQuery,
  useGetCustomerSupportInformationActiveDetailQuery,
  useLazyGetCustomerSupportInformationDetailQuery,
  useCreateCustomerSupportInformationMutation,
  useUpdateCustomerSupportInformationMutation,
  useDeleteCustomerSupportInformationMutation,
  useGetCustomerSupportInformationFormatContentQuery,
  useGetCustomerSupportInformationFormatContentActiveQuery,
  useLazyGetCustomerSupportInformationFormatContentQuery
} = customerSupportInformationApi;
