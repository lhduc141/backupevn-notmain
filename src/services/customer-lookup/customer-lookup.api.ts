import { createApi } from '@reduxjs/toolkit/query/react';
import { result } from 'lodash';




import { ResponseDto, ResponsePagingDto } from 'types';
import { CustomerDto } from 'types/dto/customer-lookup';
import { CustomerCode, CustomerPeriods, Periods, PowerComsumption } from 'types/dto/customer-lookup/electricity-consumption.dto';
import { FindAllCustomersDto } from 'types/dto/customer-lookup/find-all-customers.dto';
import { CustomerCodeCadastralCode, CustomerContactInfo, CustomerPriceContract, PostCustomerCode } from 'types/dto/customer-lookup/price-contract.dto';

import axiosBaseQuery from 'utils/base-api';
export const customerLookupApi = createApi({
  reducerPath: 'customerLookupApi',
  tagTypes: ['customers', 'customer_detail',],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getCustomers: builder.query<ResponsePagingDto<CustomerDto>, FindAllCustomersDto>({
      query: ({ customerName, customerAddress, meterSerialNumber, customerCode, routeCode, meterPointCode }) => {
        const params = new URLSearchParams();
        if (customerName) params.append('customerName', customerName);
        if (customerAddress) params.append('customerAddress', customerAddress);
        if (meterSerialNumber) params.append('meterSerialNumber', meterSerialNumber);
        if (customerCode) params.append('customerCode', customerCode);
        if (routeCode) params.append('routeCode', routeCode);
        if (meterPointCode) params.append('meterPointCode', meterPointCode);
        return {
          url: `/customers?${params}&pageSize=10`,
          method: 'get',
        };
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ customerId }) => ({
            type: 'customers',
            id: customerId
          }))
          : ['customers']
    }),
    getCustomersByFullText: builder.query<ResponsePagingDto<CustomerDto>, FindAllCustomersDto>({
      query: (params) => ({
        url: `/customers/fulltext_search?keyword=${params}`,
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ customerId }) => ({
            type: 'customers',
            id: customerId,
          }))
          : ['customers']
    }),
    getCustomerDetail: builder.query<ResponseDto<CustomerDto>, number>({
      query: (customerId) => ({ url: `/customers/${customerId}`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'customer_detail', id: result.data.customerId }] : [])
    }),
    postCustomerPriceContract: builder.mutation<ResponseDto<CustomerPriceContract>, PostCustomerCode>({
      query: (customerCode) => ({
        url: `/cmis_info_retrieval/customer_price_contract`,
        method: 'post',
        data: customerCode,
      }),
    }),
    postCustomerMeterReadingCode: builder.mutation<ResponseDto<CustomerPriceContract>, PostCustomerCode>({
      query: (customerCode) => ({
        url: `/cmis_info_retrieval/customer_meter_reading_code`,
        method: 'post',
        data: customerCode,
      }),
    }),
    postPowerSupplyStatus: builder.mutation<ResponseDto<CustomerPriceContract>, CustomerCodeCadastralCode>({
      query: (cusCodeDetail) => ({
        url: `/oms_info_retrieval/power_supply_status`,
        method: 'post',
        data: cusCodeDetail,
      }),
    }),
    postPowerCutShedule: builder.mutation<ResponseDto<CustomerPriceContract>, CustomerCodeCadastralCode>({
      query: (cusCodeDetail) => ({
        url: `/oms_info_retrieval/power_cut_schedule`,
        method: 'post',
        data: cusCodeDetail,
      }),
    }),
    postCustomerContractInfo: builder.mutation<ResponseDto<CustomerContactInfo>, PostCustomerCode>({
      query: (cusCodeDetail) => ({
        url: `/cmis_info_retrieval/customer_contract_info`,
        method: 'post',
        data: cusCodeDetail,
      }),
    }),
    //get list of Period
    postCustomerPeriodMutation: builder.mutation<ResponseDto<Periods>, CustomerCode>({
      query: (customerCode) => ({
        url: `/cmis_info_retrieval/customer_power_usage_periods`,
        method: 'post',
        data: customerCode,
      }),
    }),
    postCustomerPowerConsumption: builder.mutation<ResponseDto<PowerComsumption>, CustomerPeriods>({
      query: (customerPeriod) => ({
        url: `/cmis_info_retrieval/customer_power_consumption`,
        method: 'post',
        data: customerPeriod,
      }),
    }),
  })
})

export const {
  useGetCustomersQuery,
  useGetCustomerDetailQuery,
  usePostCustomerPriceContractMutation,
  usePostCustomerMeterReadingCodeMutation,
  usePostPowerSupplyStatusMutation,
  usePostPowerCutSheduleMutation,
  usePostCustomerContractInfoMutation,
  usePostCustomerPeriodMutationMutation,
  usePostCustomerPowerConsumptionMutation
} = customerLookupApi