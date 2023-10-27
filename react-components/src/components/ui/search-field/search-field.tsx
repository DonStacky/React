import { Component } from 'react';
import './search-field.scss';

type Props = {
  search: (searchTerm: string) => void;
};

type State = {
  searchTerm: string;
  inputValue: string;
};

export class SearchField extends Component<Props, State> {
  state: State = {
    searchTerm: '',
    inputValue: 'Enter to search',
  };

  componentDidMount() {
    const localTerm = localStorage.getItem('searchTermRSG');
    this.setState({
      ...this.state,
      inputValue: localTerm ?? 'Enter to search',
    });
  }

  handleButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      this.setState({ ...this.state, inputValue: 'Enter to search' });
    }
    this.props.search(this.state.searchTerm);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, searchTerm: event.target.value });
  };

  render() {
    return (
      <form className="search-field__form container">
        <input
          type="text"
          className="search-field__input"
          placeholder={this.state.inputValue || 'Enter to search'}
          onChange={(event) => this.handleInputChange(event)}
        />
        <button
          className="search-field__button"
          onClick={(event) => this.handleButtonClick(event)}
        >
          Search
        </button>
      </form>
    );
  }
}
