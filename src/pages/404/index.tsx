import { Button, Result } from 'antd';
import { useTitle } from 'hooks';
import { messages } from 'messages';
import { Link } from 'react-router-dom';
import { ROUTE } from 'routes/constants';

function NotFoundPage() {
  useTitle('404');

  return (
    <Result
      status='404'
      title='404'
      subTitle={messages.pageNotFound}
      extra={
        <Link to={ROUTE.HOME}>
          <Button type='primary'>{messages.home}</Button>
        </Link>
      }
    />
  );
}

export default NotFoundPage;
