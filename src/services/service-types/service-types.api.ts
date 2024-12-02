import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateServiceTypeDto,
  FindAllServiceTypeDto,
  FindWithKeywordDto,
  ResponseDto,
  ResponsePagingDto,
  ServiceTypeCompactDto,
  ServiceTypeDto,
  ServiceTypeHierarchyDto,
  UpdateServiceTypeDto
} from 'types';
import { removeEmptyChildren } from 'utils';
import axiosBaseQuery from 'utils/base-api';

export const serviceTypesApi = createApi({
  reducerPath: 'serviceTypesApi',
  tagTypes: ['service_types', 'service_types_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getServiceTypes: builder.query<ResponsePagingDto<ServiceTypeDto>, FindAllServiceTypeDto>({
      query: (params) => ({
        url: '/service_types',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ serviceTypeId }) => ({
              type: 'service_types',
              id: serviceTypeId
            }))
          : ['service_types']
    }),

    getServiceTypesHierarchy: builder.query<ResponseDto<ServiceTypeHierarchyDto[]>, FindWithKeywordDto>({
      query: (params) => ({
        url: '/service_types/hierarchy',
        method: 'get',
        params
      }),
      transformResponse: (res: ResponseDto<ServiceTypeHierarchyDto[]>) => ({
        ...res,
        data: removeEmptyChildren(res.data)
      }),
      providesTags: ['service_types']
    }),

    getServiceTypesOptions: builder.query<ResponsePagingDto<ServiceTypeCompactDto>, FindAllServiceTypeDto>({
      query: (params) => ({
        url: '/service_types/options',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.serviceTypeId?.length && queryArgs.serviceTypeId.length > 0) {
          return endpointName + '/.serviceTypesId';
        }
        return endpointName;
      },
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
          currentArg?.serviceTypeId !== previousArg?.serviceTypeId ||
          currentArg?.minLevel !== previousArg?.minLevel
        );
      },
      providesTags: ['service_types']
    }),

    getServiceTypeActive: builder.query<ResponsePagingDto<Omit<ServiceTypeDto, 'content'>>, FindAllServiceTypeDto>({
      query: (params) => ({
        url: '/service_types',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ serviceTypeId }) => ({
              type: 'service_types',
              id: serviceTypeId
            }))
          : ['service_types']
    }),
    getServiceTypeDetail: builder.query<ResponseDto<ServiceTypeDto>, number>({
      query: (serviceTypeId) => ({
        url: `/service_types/${serviceTypeId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'service_types', id: result.data.serviceTypeId }] : [])
    }),

    createServiceType: builder.mutation<ResponseDto<ServiceTypeDto>, CreateServiceTypeDto>({
      query: (newServiceType) => ({
        url: '/service_types',
        method: 'post',
        data: newServiceType
      }),
      invalidatesTags: ['service_types']
    }),
    updateServiceType: builder.mutation<ResponseDto<ServiceTypeDto>, UpdateServiceTypeDto>({
      query: ({ serviceTypeId, ...updateServiceType }) => ({
        url: `/service_types/${serviceTypeId}`,
        method: 'patch',
        data: updateServiceType
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'service_types' },
        { type: 'service_types', id: param.serviceTypeId },
        { type: 'service_types_detail', id: param.serviceTypeId }
      ]
    }),
    deleteServiceType: builder.mutation<ResponseDto<null>, number>({
      query: (serviceTypeId) => ({
        url: `/service_types/${serviceTypeId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'service_types' },
        { type: 'service_types', id: param },
        { type: 'service_types_detail', id: param }
      ]
    })
  })
});

export const {
  useGetServiceTypesHierarchyQuery,
  useGetServiceTypeActiveQuery,
  useGetServiceTypesQuery,
  useLazyGetServiceTypesOptionsQuery,
  useGetServiceTypesOptionsQuery,
  useGetServiceTypeDetailQuery,
  useCreateServiceTypeMutation,
  useUpdateServiceTypeMutation,
  useDeleteServiceTypeMutation
} = serviceTypesApi;
