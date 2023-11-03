import { Component, ReactNode } from 'react';
import { Card } from '../ui/card/card';
import Pepe from 'image/pepe.webp';

const ERROR_MESSAGE =
  'On behalf of clowns-developers apologize for the inconvenience!\n';

interface Props {
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
          id={0}
          name="Caught error"
          description={ERROR_MESSAGE}
          image={Pepe}
        />
      );
    }

    return this.props.children;
  }
}
