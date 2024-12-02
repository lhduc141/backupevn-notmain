import { Empty as EmptyAntd, EmptyProps } from 'antd';

const Empty = ({ ...props }: EmptyProps) => {
  return <EmptyAntd {...props} />;
};
export default Empty;
