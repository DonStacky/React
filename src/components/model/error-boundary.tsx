import { Component, ReactNode } from 'react';
import { Card } from '../ui/card';

const ERROR_MESSAGE =
  'On behalf of clowns-developers apologize for the inconvenience!\n';

interface Props {
  page: number;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('Caught error:', ERROR_MESSAGE, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card
          page={this.props.page}
          id={0}
          name="Caught error"
          description={ERROR_MESSAGE}
          image="/image/pepe.webp"
        />
      );
    }

    return this.props.children;
  }
}
