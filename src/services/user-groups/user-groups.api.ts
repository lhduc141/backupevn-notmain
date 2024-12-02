import { createApi } from '@reduxjs/toolkit/query/react';
import { AppDispatch } from 'store';
import {
  CreateUserGroupDto,
  FindAllUserGroupDto,
  FindOneUserGroupUsersDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateUserGroupDto,
  UserCompactDto,
  UserGroupCompactDto,
  UserGroupDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const userGroupsApi = createApi({
  reducerPath: 'userGroupsApi',
  tagTypes: ['user_groups', 'user_groups_detail', 'user_group_users'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getUserGroups: builder.query<ResponsePagingDto<UserGroupDto>, FindAllUserGroupDto>({
      query: (params) => ({
        url: '/user_groups',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ userGroupId }) => ({
              type: 'user_groups',
              id: userGroupId
            }))
          : ['user_groups']
    }),

    getUserGroupsOptions: builder.query<ResponsePagingDto<UserGroupCompactDto>, FindAllUserGroupDto>({
      query: (params) => ({
        url: '/user_groups/options',
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
          currentArg?.userGroupId !== previousArg?.userGroupId
        );
      },
      providesTags: ['user_groups']
    }),

    getUserGroupUsers: builder.query<ResponsePagingDto<UserCompactDto>, FindOneUserGroupUsersDto>({
      query: ({ userGroupId, ...params }) => ({
        url: `/user_groups/${userGroupId}/users`,
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
          currentArg?.userGroupId !== previousArg?.userGroupId
        );
      },
      providesTags: (result, _, params) => (result ? [{ type: 'user_group_users', id: params.userGroupId }] : [])
    }),

    getUserGroupDetail: builder.query<ResponseDto<UserGroupDto>, number>({
      query: (userGroupId) => ({ url: `/user_groups/${userGroupId}`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'user_groups_detail', id: result.data.userGroupId }] : [])
    }),

    createUserGroup: builder.mutation<ResponseDto<UserGroupDto>, CreateUserGroupDto>({
      query: (newUserGroup) => ({
        url: '/user_groups',
        method: 'post',
        data: newUserGroup
      }),
      invalidatesTags: ['user_groups']
    }),
    updateUserGroup: builder.mutation<ResponseDto<UserGroupDto>, UpdateUserGroupDto>({
      query: ({ userGroupId, ...updateUserGroup }) => ({
        url: `/user_groups/${userGroupId}`,
        method: 'patch',
        data: updateUserGroup
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'user_groups', id: param.userGroupId },
        { type: 'user_groups_detail', id: param.userGroupId }
      ]
    }),
    deleteUserGroup: builder.mutation<void, number>({
      query: (userGroupId) => ({
        url: `/user_groups/${userGroupId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'user_groups', id: param },
        { type: 'user_groups_detail', id: param }
      ]
    })
  })
});

const resetUserGroupUsers = (endpointName: any, arg?: Partial<FindOneUserGroupUsersDto>) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      userGroupsApi.util.updateQueryData(endpointName, undefined, (draftData: any) => {
        draftData.data.rows = [];
        draftData.data.count = 0;
      })
    );
  };
};

export { resetUserGroupUsers };

export const {
  useGetUserGroupsOptionsQuery,
  useLazyGetUserGroupsOptionsQuery,
  useGetUserGroupsQuery,
  useGetUserGroupDetailQuery,
  useCreateUserGroupMutation,
  useUpdateUserGroupMutation,
  useDeleteUserGroupMutation,
  useLazyGetUserGroupUsersQuery
} = userGroupsApi;
