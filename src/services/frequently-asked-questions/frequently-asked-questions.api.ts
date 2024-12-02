import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CreateFrequentlyAskedQuestionDto,
  FindAllFrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionDto,
  FrequentlyAskedQuestionOmitContentDto,
  ResponseDto,
  ResponsePagingDto,
  UpdateFrequentlyAskedQuestionDto
} from 'types';

import axiosBaseQuery from 'utils/base-api';

export const frequentlyAskedQuestionApi = createApi({
  reducerPath: 'frequentlyAskedQuestionApi',
  tagTypes: ['frequently_asked_questions', 'frequently_asked_questions_detail'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getFrequentlyAskedQuestionsActive: builder.query<
      ResponsePagingDto<FrequentlyAskedQuestionOmitContentDto>,
      Omit<FindAllFrequentlyAskedQuestionDto, 'isActive'>
    >({
      query: (params) => ({
        url: '/frequently_asked_questions/active',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ frequentlyAskedQuestionId }) => ({
              type: 'frequently_asked_questions',
              id: frequentlyAskedQuestionId
            }))
          : ['frequently_asked_questions']
    }),

    getFrequentlyAskedQuestionActiveDetail: builder.query<ResponseDto<FrequentlyAskedQuestionDto>, number>({
      query: (params) => ({
        url: '/frequently_asked_questions/active',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'frequently_asked_questions_detail', id: result.data.frequentlyAskedQuestionId }] : []
    }),

    getFrequentlyAskedQuestions: builder.query<
      ResponsePagingDto<FrequentlyAskedQuestionOmitContentDto>,
      FindAllFrequentlyAskedQuestionDto
    >({
      query: (params) => ({
        url: '/frequently_asked_questions',
        method: 'get',
        params
      }),
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ frequentlyAskedQuestionId }) => ({
              type: 'frequently_asked_questions',
              id: frequentlyAskedQuestionId
            }))
          : ['frequently_asked_questions']
    }),

    getFrequentlyAskedQuestionDetail: builder.query<ResponseDto<FrequentlyAskedQuestionDto>, number>({
      query: (frequentlyAskedQuestionId) => ({
        url: `/frequently_asked_questions/${frequentlyAskedQuestionId}`,
        method: 'get'
      }),
      providesTags: (result) =>
        result?.data ? [{ type: 'frequently_asked_questions_detail', id: result.data.frequentlyAskedQuestionId }] : []
    }),

    createFrequentlyAskedQuestion: builder.mutation<
      ResponseDto<FrequentlyAskedQuestionDto>,
      CreateFrequentlyAskedQuestionDto
    >({
      query: (newFrequentlyAskedQuestion) => ({
        url: '/frequently_asked_questions',
        method: 'post',
        data: newFrequentlyAskedQuestion
      }),
      invalidatesTags: ['frequently_asked_questions']
    }),

    updateFrequentlyAskedQuestion: builder.mutation<
      ResponseDto<FrequentlyAskedQuestionDto>,
      UpdateFrequentlyAskedQuestionDto
    >({
      query: ({ frequentlyAskedQuestionId, ...updateFrequentlyAskedQuestion }) => ({
        url: `/frequently_asked_questions/${frequentlyAskedQuestionId}`,
        method: 'patch',
        data: updateFrequentlyAskedQuestion
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'frequently_asked_questions', id: param.frequentlyAskedQuestionId },
        { type: 'frequently_asked_questions_detail', id: param.frequentlyAskedQuestionId }
      ]
    }),

    deleteFrequentlyAskedQuestion: builder.mutation<ResponseDto<null>, number>({
      query: (userDeleteId) => ({
        url: `/frequently_asked_questions/${userDeleteId}`,
        method: 'delete'
      }),
      invalidatesTags: (_result, _error, param) => [
        { type: 'frequently_asked_questions', id: param },
        { type: 'frequently_asked_questions_detail', id: param }
      ]
    })
  })
});

export const {
  useCreateFrequentlyAskedQuestionMutation,
  useDeleteFrequentlyAskedQuestionMutation,
  useUpdateFrequentlyAskedQuestionMutation,
  useGetFrequentlyAskedQuestionActiveDetailQuery,
  useGetFrequentlyAskedQuestionDetailQuery,
  useGetFrequentlyAskedQuestionsActiveQuery,
  useGetFrequentlyAskedQuestionsQuery
} = frequentlyAskedQuestionApi;
