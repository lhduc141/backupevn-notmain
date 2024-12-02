import { ConfigProvider, message, notification } from 'antd';
import { CloseIcon } from 'assets';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'store';
import { theme } from 'themes';
import { WEEKDAYS_NAME } from 'utils';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

dayjs.locale('vi');
dayjs.locale({
  ...dayjs.Ls.vi,
  weekdays: WEEKDAYS_NAME
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
notification.config({
  closeIcon: <CloseIcon />,
  duration: 5
});
message.config({
  duration: 5
});

root.render(
  <Provider store={store}>
    <ConfigProvider
      modal={{
        closeIcon: <CloseIcon />
      }}
      theme={theme}
    >
      <App />
    </ConfigProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Đăng ký Service Worker
function handleUpdate(registration: ServiceWorkerRegistration) {
  // Thông báo cho người dùng có phiên bản mới
  if (window.confirm('Ứng dụng đã có phiên bản mới')) {
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}

// serviceWorkerRegistration.register({
//   onUpdate: handleUpdate
// });

serviceWorkerRegistration.unregister();
