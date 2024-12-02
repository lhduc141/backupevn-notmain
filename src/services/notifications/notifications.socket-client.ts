import { NotificationDto } from 'types';
import { configuration, LOCAL_STORAGE_KEY, NOTIFICATION_EVENT, SocketClient } from 'utils';
export const notificationsSocketClient = new SocketClient({
  uri: configuration.NOTIFICATION_SOCKET_URL!,
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  }
});

export async function connectNotificationSocket() {
  notificationsSocketClient.connect();
}

export async function disconnectNotificationSocket() {
  notificationsSocketClient.disconnect();
}

export async function reconnectNotificationSocket() {
  notificationsSocketClient.reconnect();
}

export function onReceiveNotification(callback?: (data: NotificationDto) => void) {
  notificationsSocketClient.socket.on(NOTIFICATION_EVENT.NOTIFICATION, (data: NotificationDto) => {
    callback?.(data);
  });
}

export function offReceiveNotification() {
  notificationsSocketClient.socket.off(NOTIFICATION_EVENT.NOTIFICATION);
}
