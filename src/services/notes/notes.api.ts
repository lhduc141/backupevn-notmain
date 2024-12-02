import { createApi } from '@reduxjs/toolkit/query/react';
import { NoteDto, ResponseDto, UpdateNoteDto, WorkingScheduleDto } from 'types';
import axiosBaseQuery from 'utils/base-api';

export const notesApi = createApi({
  reducerPath: 'noteApi',
  tagTypes: ['notes'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getNotes: builder.query<ResponseDto<NoteDto>, void>({
      query: () => ({
        url: `/notes/me`,
        method: 'get'
      }),
      providesTags: ['notes']
    }),

    updateNote: builder.mutation<ResponseDto<WorkingScheduleDto>, UpdateNoteDto>({
      query: (updateNote) => ({
        url: `/notes/me`,
        method: 'put',
        data: updateNote
      }),
      invalidatesTags: ['notes']
    })
  })
});

export const { useGetNotesQuery, useUpdateNoteMutation } = notesApi;
