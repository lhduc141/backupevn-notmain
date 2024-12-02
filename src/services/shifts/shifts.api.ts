import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ActiveUserShiftDto,
  CreateShiftDto,
  FindAllShiftDto,
  FindAllUserShiftDto,
  ResponseDto,
  ResponsePagingDto,
  ResponseShiftOptionDto,
  ShiftDto,
  UpdateShiftDto,
  UserShiftDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const shiftsApi = createApi({
  reducerPath: 'shiftsApi',
  tagTypes: ['shifts', 'shifts_me', 'shifts_detail', 'shifts_user'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    /** Danh sách ca trực */
    getShifts: builder.query<ResponsePagingDto<ShiftDto>, FindAllShiftDto>({
      query: (params) => ({
        url: '/shifts',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ shiftId }) => ({
              type: 'shifts',
              id: shiftId
            }))
          : ['shifts']
    }),

    /** Chi tiết ca trực */
    getShiftDetail: builder.query<ResponseDto<ShiftDto>, number>({
      query: (shiftId) => ({
        url: `/shifts/${shiftId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'shifts', id: result.data.shiftId }] : [])
    }),

    /** Tạo ca trực */
    createShift: builder.mutation<ResponseDto<ShiftDto>, CreateShiftDto>({
      query: (newSchedule) => ({
        url: '/shifts',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['shifts']
    }),

    /** Cập nhât ca trực */
    updateShift: builder.mutation<ResponseDto<ShiftDto>, UpdateShiftDto>({
      query: ({ shiftId, ...updateSchedule }) => ({
        url: `/shifts/${shiftId}`,
        method: 'patch',
        data: updateSchedule
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'shifts', id: param.shiftId },
        { type: 'shifts_detail', id: param.shiftId }
      ]
    }),

    /** Xóa ca trực */
    deleteShift: builder.mutation<ResponseDto<null>, number>({
      query: (shiftId) => ({
        url: `/shifts/${shiftId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'shifts', id: param },
        { type: 'shifts_detail', id: param }
      ]
    }),

    /** Danh sách tất cả tùy chọn ca trực */
    getAllShiftsOptions: builder.query<ResponseDto<ResponseShiftOptionDto>, void>({
      query: (params) => ({
        url: '/shifts/options',
        method: 'get',
        params
      }),

      providesTags: (result) => {
        return result?.data && Object.values(result.data).length > 0
          ? Object.values(result.data)
              .flat()
              .map(({ shiftId }) => ({
                type: 'shifts',
                id: shiftId
              }))
          : ['shifts'];
      }
    }),

    /** Danh sách ca trực đã thực hiện của account */
    getShiftsMe: builder.query<ResponsePagingDto<UserShiftDto>, FindAllShiftDto>({
      query: (params) => ({
        url: '/shifts/me',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ shiftId, userId }) => ({
              type: 'shifts_me',
              id: `${shiftId}`
            }))
          : ['shifts_me']
    }),

    /** Ca trực đang hoạt động của người dùng */
    getShiftMeActive: builder.query<ResponseDto<UserShiftDto>, void>({
      query: (params) => ({
        url: '/shifts/me/active',
        method: 'get',
        params
      }),
      providesTags: ['shifts_me']
    }),

    /** Người dùng bắt đầu ca trực */
    activeShift: builder.mutation<ResponseDto<null>, ActiveUserShiftDto>({
      query: (newSchedule) => ({
        url: '/shifts/me/active',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['shifts_me']
    }),

    /** Người dùng chọn lại ca trực */
    updateActiveShift: builder.mutation<ResponseDto<null>, ActiveUserShiftDto>({
      query: (newSchedule) => ({
        url: '/shifts/me/active',
        method: 'patch',
        data: newSchedule
      }),
      invalidatesTags: ['shifts_me']
    }),

    /** Người dùng kết thúc ca trực */
    inactiveShift: builder.mutation<ResponseDto<null>, void>({
      query: (newSchedule) => ({
        url: '/shifts/me/inactive',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['shifts_me']
    }),

    /** Danh sách ca trực đã thực hiện của người dùng */
    getShiftsUser: builder.query<ResponsePagingDto<UserShiftDto>, FindAllUserShiftDto>({
      query: ({ userId, ...params }) => ({
        url: `/shifts/users/${userId}`,
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageIndex !== 1) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.keyword !== previousArg?.keyword || currentArg?.pageIndex !== previousArg?.pageIndex;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ shiftId, userId }) => ({
              type: 'shifts_user',
              id: `${shiftId}-${userId}`
            }))
          : ['shifts_user']
    })
  })
});

export const {
  useGetShiftsQuery,
  useGetAllShiftsOptionsQuery,
  useGetShiftMeActiveQuery,
  useGetShiftDetailQuery,
  useGetShiftsMeQuery,
  useCreateShiftMutation,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
  useActiveShiftMutation,
  useInactiveShiftMutation,
  useGetShiftsUserQuery,
  useUpdateActiveShiftMutation
} = shiftsApi;
