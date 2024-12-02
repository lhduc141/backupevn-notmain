import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponsePagingDto } from 'types';
import { ChannelDto, FindAllChannelDto } from 'types/dto/channel';
import axiosBaseQuery from 'utils/base-api';

export const channelsApi = createApi({
    reducerPath: 'channelsApi',
    tagTypes: ['channels', 'channels_detail'],
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getChannels: builder.query<ResponsePagingDto<ChannelDto>, FindAllChannelDto>({
            query: (params) => ({
                url: '/channels',
                method: 'get',
                params
            }),
            providesTags: (result) =>
                result && result.data.rows.length > 0
                    ? result.data.rows.map(({ channelId}) => ({
                        type: 'channels',
                        id: channelId
                      }))
                    : ['channels']
        }),
    })
})

export const {
    useGetChannelsQuery,
} = channelsApi