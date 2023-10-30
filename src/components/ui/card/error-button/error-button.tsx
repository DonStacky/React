import { Component, ReactNode } from 'react';
import './error-button.scss';

type Props = {
  children?: ReactNode;
};

type State = {
  isError: boolean;
};

export class ErrorButton extends Component<Props, State> {
  state = {
    isError: false,
  };

  handleClick = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error();
    } else {
      return (
        <button className="error-button" onClick={this.handleClick}>
          Error
        </button>
      );
    }
  }
}
