import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateVipCustomerDto,
  FindAllVipCustomerDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateVipCustomerDto,
  VipCustomerDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const vipCustomersApi = createApi({
  reducerPath: 'vipCustomersApi',
  tagTypes: ['vip_customers', 'vip_customers_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getVipCustomers: builder.query<ResponsePagingDto<VipCustomerDto>, FindAllVipCustomerDto>({
      query: (params) => ({
        url: '/vip_customers',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ vipCustomerId }) => ({
              type: 'vip_customers',
              id: vipCustomerId
            }))
          : ['vip_customers']
    }),

    getVipCustomerDetail: builder.query<ResponseDto<VipCustomerDto>, number>({
      query: (vipCustomerId) => ({
        url: `/vip_customers/${vipCustomerId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'vip_customers', id: result.data.vipCustomerId }] : [])
    }),

    createVipCustomer: builder.mutation<ResponseDto<VipCustomerDto>, CreateVipCustomerDto>({
      query: (newVipCustomer) => ({
        url: '/vip_customers',
        method: 'post',
        data: newVipCustomer
      }),
      invalidatesTags: ['vip_customers']
    }),
    updateVipCustomer: builder.mutation<ResponseDto<VipCustomerDto>, UpdateVipCustomerDto>({
      query: ({ vipCustomerId, ...updateVipCustomer }) => ({
        url: `/vip_customers/${vipCustomerId}`,
        method: 'patch',
        data: updateVipCustomer
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'vip_customers', id: param.vipCustomerId },
        { type: 'vip_customers_detail', id: param.vipCustomerId }
      ]
    }),
    deleteVipCustomer: builder.mutation<ResponseDto<null>, number>({
      query: (vipCustomerId) => ({
        url: `/vip_customers/${vipCustomerId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'vip_customers', id: param },
        { type: 'vip_customers_detail', id: param }
      ]
    })
  })
});

export const {
  useGetVipCustomersQuery,
  useGetVipCustomerDetailQuery,
  useCreateVipCustomerMutation,
  useUpdateVipCustomerMutation,
  useDeleteVipCustomerMutation
} = vipCustomersApi;
