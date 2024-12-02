import { createApi } from '@reduxjs/toolkit/query/react';
import { AppDispatch } from 'store';
import {
  CreateUserDto,
  FindAllUserDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateProfileDto,
  UpdateUserDto,
  UserCompactDto,
  UserDto,
  UserPermissionsDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['users', 'user_detail', 'user_permissions'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    //user-profile
    getUserProfile: builder.query<ResponseDto<UserDto>, void>({
      query: () => ({
        url: '/users/profile',
        method: 'get'
      }),
      providesTags: [{ type: 'user_detail', id: 'profile' }]
    }),

    updateUserProfile: builder.mutation<ResponseDto<UserDto>, UpdateProfileDto>({
      query: (updateData) => ({
        url: `/users/profile`,
        method: 'put',
        data: updateData
      }),
      invalidatesTags: [{ type: 'user_detail', id: 'profile' }]
    }),
    getUserProfilePermissions: builder.query<ResponseDto<UserPermissionsDto>, void>({
      query: () => ({ url: `/users/profile/permissions`, method: 'get' }),
      providesTags: (result) => (result ? [{ type: 'user_permissions', id: 'profile' }] : [])
    }),

    //user
    getUsers: builder.query<ResponsePagingDto<UserDto>, FindAllUserDto>({
      query: (params) => ({
        url: '/users',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length
          ? result.data.rows.map(({ userId }) => ({
              type: 'users',
              id: userId
            }))
          : ['users']
    }),

    getUsersOptions: builder.query<ResponsePagingDto<UserCompactDto>, FindAllUserDto>({
      query: ({ ...params }) => ({
        url: '/users/options',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        if (queryArgs.organizationUnitId && queryArgs.organizationUnitId.length > 0) {
          const organizationUnitIdKey = [...queryArgs.organizationUnitId].sort().join(',');
          return endpointName + organizationUnitIdKey;
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
          currentArg?.organizationUnitId !== previousArg?.organizationUnitId
        );
      },
      providesTags: ['users']
    }),

    getUser: builder.query<ResponseDto<UserDto>, number>({
      query: (userId) => ({ url: `/users/${userId}`, method: 'get' }),
      providesTags: (result) => (result?.data ? [{ type: 'user_detail', id: result.data.userId }] : [])
    }),

    getUserPermissions: builder.query<ResponseDto<UserPermissionsDto>, number>({
      query: (userId) => ({ url: `/users/${userId}/permissions`, method: 'get' }),
      providesTags: (result) => (result?.data ? [{ type: 'user_permissions', id: result.data.userId }] : [])
    }),

    createUser: builder.mutation<ResponseDto<UserDto>, CreateUserDto>({
      query: (newUser) => ({
        url: '/users',
        method: 'post',
        data: newUser
      }),
      invalidatesTags: ['users']
    }),
    updateUser: builder.mutation<ResponseDto<UserDto>, UpdateUserDto>({
      query: ({ userId, ...updateUser }) => ({
        url: `/users/${userId}`,
        method: 'patch',
        data: updateUser
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'users', id: param.userId },
        { type: 'user_detail', id: param.userId },
        { type: 'user_permissions', id: param.userId }
      ]
    }),
    deleteUser: builder.mutation<ResponseDto<null>, number>({
      query: (userDeleteId) => ({
        url: `/users/${userDeleteId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [{ type: 'users' }]
    })
  })
});
const resetUsers = (endpointName: any, arg?: Partial<FindAllUserDto>) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      usersApi.util.updateQueryData(endpointName, undefined, (draftData: any) => {
        draftData.data.rows = [];
        draftData.data.count = 0;
      })
    );
  };
};

export { resetUsers };
export const {
  useGetUserPermissionsQuery,
  useUpdateUserProfileMutation,
  useGetUserProfilePermissionsQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useGetUsersOptionsQuery,
  useLazyGetUsersOptionsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery
} = usersApi;
