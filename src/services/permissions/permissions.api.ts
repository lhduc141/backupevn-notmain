import { createApi } from '@reduxjs/toolkit/query/react';
import {
  FindAllPermissionDto,
  PermissionCompactDto,
  PermissionDto,
  ResponseDto,
  ResponsePagingDto,
  UpdatePermissionScopeDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const permissionsApi = createApi({
  reducerPath: 'permissionsApi',
  tagTypes: ['permissions', 'permissions_detail', 'permissions_me'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getPermissions: builder.query<ResponsePagingDto<PermissionDto>, FindAllPermissionDto>({
      query: (params) => ({
        url: '/permissions',
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
          ? result.data.rows.map(({ permissionId }) => ({
              type: 'permissions',
              id: permissionId
            }))
          : ['permissions'],
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      }
    }),

    getPermissionsOptions: builder.query<ResponsePagingDto<PermissionCompactDto>, FindAllPermissionDto>({
      query: (params) => ({
        url: '/permissions/options',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.roleIds && queryArgs.roleIds.length > 0) {
          const roleIdsKey = [...queryArgs.roleIds].sort().join(',');
          return endpointName + roleIdsKey;
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
          currentArg?.roleIds !== previousArg?.roleIds ||
          currentArg?.organizationUnitIds !== previousArg?.organizationUnitIds
        );
      },
      providesTags: ['permissions']
    }),

    getPermissionDetail: builder.query<ResponseDto<PermissionDto>, number>({
      query: (permissionId) => ({ url: `/permissions/${permissionId}`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'permissions_detail', id: result.data.permissionId }] : [])
    }),

    getMePermissions: builder.query<ResponseDto<number[]>, void>({
      query: () => ({ url: `/permissions/me`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'permissions_me' }] : [])
    }),

    updatePermissionScope: builder.mutation<ResponseDto<void>, UpdatePermissionScopeDto>({
      query: ({ permissionId, ...updatePermissionScope }) => ({
        url: `/permissions/${permissionId}`,
        method: 'patch',
        data: updatePermissionScope
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'permissions', id: param.permissionId },
        { type: 'permissions_detail', id: param.permissionId }
      ]
    })
  })
});

export const {
  useGetPermissionsOptionsQuery,
  useLazyGetPermissionsOptionsQuery,
  useGetPermissionsQuery,
  useGetPermissionDetailQuery,
  useGetMePermissionsQuery,
  useUpdatePermissionScopeMutation
} = permissionsApi;
