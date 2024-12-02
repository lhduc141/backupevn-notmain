import { createApi } from '@reduxjs/toolkit/query/react';
import { notification } from 'antd';
import { NotificationColoredIcon } from 'assets';
import { notificationsMessages } from 'messages';
import { ROUTE } from 'routes/constants';
import { FindAllNotificationDto, NotificationDto, ResponseDto, ResponsePagingDto } from 'types';
import axiosBaseQuery from 'utils/base-api';
import { offReceiveNotification, onReceiveNotification } from './notifications.socket-client';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  tagTypes: ['notifications', 'notifications_detail', 'notifications_unread'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    geNotifications: builder.query<ResponsePagingDto<NotificationDto>, FindAllNotificationDto>({
      query: (params) => ({
        url: '/notifications',
        method: 'get',
        params
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.skip !== 0) {
          currentCache.data.rows.push(...newItems.data.rows);
        } else currentCache.data.rows = newItems.data.rows;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip || currentArg?.limit !== previousArg?.limit;
      },
      providesTags: (result) =>
        result && result.data.rows.length > 0
          ? result.data.rows.map(({ notificationId }) => ({
              type: 'notifications',
              id: notificationId
            }))
          : ['notifications'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          onReceiveNotification((data) => {
            updateCachedData((draft) => {
              draft.data.count += 1;
              draft.data.rows.unshift(data);
            });
          });
        } catch (err) {
          console.log({ err });
        }

        await cacheEntryRemoved;
        offReceiveNotification();
      }
    }),

    geNotificationsUnreadCount: builder.query<ResponseDto<number>, void>({
      query: () => ({
        url: `/notifications/unread_count`,
        method: 'get'
      }),
      providesTags: ['notifications_unread'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          onReceiveNotification((data) => {
            updateCachedData((draft) => {
              draft.data += 1;
            });
            notification.info({
              message: notificationsMessages.newNotif,
              description: data.content,
              icon: <NotificationColoredIcon />,
              onClick: () => {
                window.location.href = `${ROUTE.CUSTOMER_LOOKUP}?IA=${data.refId}`;
              }
            });
          });
        } catch (err) {
          console.log({ err });
        }

        await cacheEntryRemoved;
        offReceiveNotification();
      }
    }),

    readNotification: builder.mutation<ResponseDto<null>, number>({
      query: (notificationId) => ({
        url: `/notifications/read/${notificationId}`,
        method: 'put'
      }),
      invalidatesTags: ['notifications_unread']
    }),

    readAllNotifications: builder.mutation<ResponseDto<null>, void>({
      query: () => ({
        url: `/notifications/read_all`,
        method: 'put'
      }),
      invalidatesTags: ['notifications_unread']
    })
  })
});

export const {
  useGeNotificationsQuery,
  useLazyGeNotificationsQuery,
  useGeNotificationsUnreadCountQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation
} = notificationsApi;
