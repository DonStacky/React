import { Component } from 'react';
import './card.scss';

type Props = {
  name: string;
  description: string;
  image: string;
};

export class Card extends Component<Props> {
  render() {
    return (
      <div className="card">
        <div className="card__imgbox">
          <img
            className="card__img"
            src={this.props.image}
            alt={this.props.name}
          />
        </div>
        <h3 className="card__title">{this.props.name}</h3>
        <p className="card__text">{this.props.description}</p>
      </div>
    );
  }
}
