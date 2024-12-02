import { createApi } from '@reduxjs/toolkit/query/react';
import {
  FindAllServiceInstructionsDto,
  FindWithKeywordDto,
  ResponseDto,
  ResponsePagingDto,
  ServiceInstructionDto,
  ServiceTypeCompactDto,
  ServiceTypeHierarchyDto,
  UpdateServiceInstructionDto
} from 'types';
import { removeEmptyChildren } from 'utils';

import axiosBaseQuery from 'utils/base-api';

export const serviceInstructionsApi = createApi({
  reducerPath: 'serviceInstructionsApi',
  tagTypes: ['service_types', 'service_instructions', 'service_instructions_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getServiceInstructions: builder.query<ResponsePagingDto<ServiceTypeCompactDto>, FindAllServiceInstructionsDto>({
      query: (params) => ({
        url: '/service_instructions/service_types',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.flatMap(({ serviceTypeId }) => [
              {
                type: 'service_types',
                id: serviceTypeId
              },
              {
                type: 'service_instructions',
                id: serviceTypeId
              }
            ])
          : ['service_types', 'service_instructions']
    }),
    getServiceInstructionsHierarchy: builder.query<ResponseDto<ServiceTypeHierarchyDto[]>, FindWithKeywordDto>({
      query: (params) => ({
        url: '/service_instructions/service_types/hierarchy',
        method: 'get',
        params
      }),
      transformResponse: (res: ResponseDto<ServiceTypeHierarchyDto[]>) => ({
        ...res,
        data: removeEmptyChildren(res.data)
      }),
      providesTags: ['service_types', 'service_instructions']
    }),

    getServiceInstructionDetail: builder.query<ResponseDto<ServiceInstructionDto>, number>({
      query: (serviceTypeId) => ({
        url: `/service_instructions/service_types/${serviceTypeId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result ? [{ type: 'service_instructions_detail', id: result.data.serviceInstructionId }] : []
    }),

    updateServiceInstruction: builder.mutation<ResponseDto<ServiceInstructionDto>, UpdateServiceInstructionDto>({
      query: ({ serviceTypeId, ...updateServiceInstruction }) => ({
        url: `/service_instructions/service_types/${serviceTypeId}`,
        method: 'patch',
        data: updateServiceInstruction
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'service_instructions_detail', id: param.serviceTypeId }]
    })
  })
});

export const {
  useGetServiceInstructionsHierarchyQuery,
  useGetServiceInstructionsQuery,
  useGetServiceInstructionDetailQuery,
  useUpdateServiceInstructionMutation
} = serviceInstructionsApi;
