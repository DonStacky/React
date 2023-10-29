import { Component } from 'react';
import image from 'image/not-found.png';
import './not-found.scss';

export class NotFound extends Component {
  render() {
    return (
      <div className="not-found container">
        <img src={image} alt="not-found" className="not-found__image" />
        <div className="not-found__message">
          <h1 className="not-found__title">Sorry!</h1>
          <p className="not-found__text">Nothing was found for your request</p>
        </div>
      </div>
    );
  }
}
