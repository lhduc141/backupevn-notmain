import { Spin } from 'antd';
import { messages } from 'messages';
import { Suspense } from 'react';

type PropsType = {
  children?: React.ReactNode;
  message?: string;
};

function Loadable(props: PropsType) {
  return (
    <Suspense
      fallback={
        <Spin spinning tip={props.message ?? messages.loadingPage}>
          <div style={{ height: 300 }} />
        </Spin>
      }
    >
      {props.children}
    </Suspense>
  );
}

export default Loadable;
