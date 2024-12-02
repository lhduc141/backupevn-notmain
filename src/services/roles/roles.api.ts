import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateRoleDto,
  FindAllDto,
  ResponseDto,
  ResponsePagingDto,
  RoleCompactDto,
  RoleDto,
  UpdateRoleDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  tagTypes: ['roles', 'roles_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getRoles: builder.query<ResponsePagingDto<RoleDto>, FindAllDto>({
      query: (params) => ({
        url: '/roles',
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
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ roleId }) => ({
              type: 'roles',
              id: roleId
            }))
          : ['roles'],
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      }
    }),

    getRolesOptions: builder.query<ResponsePagingDto<RoleCompactDto>, FindAllDto>({
      query: (params) => ({
        url: '/roles/options',
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
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      },
      providesTags: ['roles']
    }),

    getRoleDetail: builder.query<ResponseDto<RoleDto>, number>({
      query: (roleId) => ({ url: `/roles/${roleId}`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'roles_detail', id: result.data.roleId }] : [])
    }),
    createRole: builder.mutation<ResponseDto<RoleDto>, CreateRoleDto>({
      query: (newRole) => ({
        url: '/roles',
        method: 'post',
        data: newRole
      }),
      invalidatesTags: ['roles']
    }),
    updateRole: builder.mutation<ResponseDto<RoleDto>, UpdateRoleDto>({
      query: ({ roleId, ...updateRole }) => ({
        url: `/roles/${roleId}`,
        method: 'patch',
        data: updateRole
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'roles', id: param.roleId }]
    }),
    deleteRole: builder.mutation<void, number>({
      query: (roleId) => ({
        url: `/roles/${roleId}`,
        method: 'delete'
      })
    })
  })
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetRolesOptionsQuery,
  useGetRolesQuery,
  useGetRoleDetailQuery
} = rolesApi;
