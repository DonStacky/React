import { Component } from 'react';
import loaderImg from 'image/pokeball.png';
import './loader.scss';

export class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={loaderImg} alt="pokeball-loader" />
      </div>
    );
  }
}
