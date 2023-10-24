import { Component } from 'react';
import './search-field.scss';

export class SearchField extends Component {

  render() {
    return (
          <form className="search-field__form container">
        <input
          type="text"
          className="search-field__input" 
          placeholder="Enter to search" 

        />
        <button className="search-field__button">Search</button>
        
      </form>

    );
  }
}
