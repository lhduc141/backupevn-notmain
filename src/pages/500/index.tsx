import { Button, Result } from 'antd';
import { messages } from 'messages';
import { Component, ErrorInfo, ReactNode } from 'react';
import { ROUTE } from 'routes/constants';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status='500'
          title='500'
          subTitle={messages.somethingWentWrong}
          extra={
            <Button
              type='primary'
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = ROUTE.HOME;
              }}
            >
              {messages.home}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}
