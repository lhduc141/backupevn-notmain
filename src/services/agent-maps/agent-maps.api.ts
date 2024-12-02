import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AgentMapDto,
  CreateAgentMapDto,
  FindAllAgentMapDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateAgentMapDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const agentMapsApi = createApi({
  reducerPath: 'agentMapsApi',
  tagTypes: ['agent_maps', 'agent_maps_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getAgentMaps: builder.query<ResponsePagingDto<AgentMapDto>, FindAllAgentMapDto>({
      query: (params) => ({
        url: '/agent_maps',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ agentMapId }) => ({
              type: 'agent_maps',
              id: agentMapId
            }))
          : ['agent_maps']
    }),

    getAgentMapDetail: builder.query<ResponseDto<AgentMapDto>, number>({
      query: (agentMapId) => ({
        url: `/agent_maps/${agentMapId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'agent_maps', id: result.data.agentMapId }] : [])
    }),

    createAgentMap: builder.mutation<ResponseDto<AgentMapDto>, CreateAgentMapDto>({
      query: (newSchedule) => ({
        url: '/agent_maps',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['agent_maps']
    }),
    updateAgentMap: builder.mutation<ResponseDto<AgentMapDto>, UpdateAgentMapDto>({
      query: ({ agentMapId, ...updateSchedule }) => ({
        url: `/agent_maps/${agentMapId}`,
        method: 'patch',
        data: updateSchedule
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'agent_maps', id: param.agentMapId },
        { type: 'agent_maps_detail', id: param.agentMapId }
      ]
    }),
    deleteAgentMap: builder.mutation<ResponseDto<null>, number>({
      query: (agentMapId) => ({
        url: `/agent_maps/${agentMapId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'agent_maps', id: param },
        { type: 'agent_maps_detail', id: param }
      ]
    })
  })
});

export const {
  useGetAgentMapsQuery,
  useGetAgentMapDetailQuery,
  useLazyGetAgentMapDetailQuery,
  useCreateAgentMapMutation,
  useUpdateAgentMapMutation,
  useDeleteAgentMapMutation
} = agentMapsApi;
