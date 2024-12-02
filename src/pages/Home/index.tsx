import { Typography } from 'antd';
import { useTitle } from 'hooks';
import { messages } from 'messages';

function HomePage() {
  useTitle(messages.home);

  return (
    <section style={{ textAlign: 'center' }}>
      <Typography.Title>{messages.home}</Typography.Title>
    </section>
  );
}

export default HomePage;
