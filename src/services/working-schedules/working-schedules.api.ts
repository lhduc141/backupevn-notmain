import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateWorkingScheduleDto,
  FindAllWorkingScheduleDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateWorkingScheduleDto,
  WorkingScheduleDto
} from 'types';
import axiosBaseQuery from 'utils/base-api';

export const workingSchedulesApi = createApi({
  reducerPath: 'workingSchedulesApi',
  tagTypes: ['working_schedules', 'working_schedules_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getWorkingSchedules: builder.query<ResponsePagingDto<WorkingScheduleDto>, FindAllWorkingScheduleDto>({
      query: (params) => ({
        url: '/working_schedules',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ workingScheduleId }) => ({
              type: 'working_schedules',
              id: workingScheduleId
            }))
          : ['working_schedules']
    }),

    getWorkingScheduleDetail: builder.query<ResponseDto<WorkingScheduleDto>, number>({
      query: (workingScheduleId) => ({
        url: `/working_schedules/${workingScheduleId}`,
        method: 'get'
      }),
      providesTags: (result) => (result?.data ? [{ type: 'working_schedules', id: result.data.workingScheduleId }] : [])
    }),

    createWorkingSchedule: builder.mutation<ResponseDto<WorkingScheduleDto>, CreateWorkingScheduleDto>({
      query: (newSchedule) => ({
        url: '/working_schedules',
        method: 'post',
        data: newSchedule
      }),
      invalidatesTags: ['working_schedules']
    }),
    updateWorkingSchedule: builder.mutation<ResponseDto<WorkingScheduleDto>, UpdateWorkingScheduleDto>({
      query: ({ workingScheduleId, ...updateSchedule }) => ({
        url: `/working_schedules/${workingScheduleId}`,
        method: 'patch',
        data: updateSchedule
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'working_schedules', id: param.workingScheduleId },
        { type: 'working_schedules_detail', id: param.workingScheduleId }
      ]
    }),
    deleteWorkingSchedule: builder.mutation<ResponseDto<null>, number>({
      query: (workingScheduleId) => ({
        url: `/working_schedules/${workingScheduleId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'working_schedules', id: param },
        { type: 'working_schedules_detail', id: param }
      ]
    })
  })
});

export const {
  useGetWorkingSchedulesQuery,
  useGetWorkingScheduleDetailQuery,
  useCreateWorkingScheduleMutation,
  useUpdateWorkingScheduleMutation,
  useDeleteWorkingScheduleMutation
} = workingSchedulesApi;
