import { Component } from 'react';
import './search-field.scss';

type Props = {
  search: (searchTerm: string) => void;
};

type State = {
  searchTerm: string;
};

export class SearchField extends Component<Props, State> {
  state: State = {
    searchTerm: '',
  };

  componentDidMount() {
    const localTerm = localStorage.getItem('searchTermRSG');
    if (localTerm) this.setState({ searchTerm: localTerm });
  }

  handleButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.props.search(this.state.searchTerm);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <form className="search-field__form container">
        <input
          type="text"
          className="search-field__input"
          placeholder={'Enter to search'}
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button
          className="search-field__button"
          onClick={this.handleButtonClick}
        >
          Search
        </button>
      </form>
    );
  }
}
