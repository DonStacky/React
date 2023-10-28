import { Component } from 'react';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import './result-field.scss';
import { PokemonData } from '../../../shared/types';
import { NotFound } from '../not-found/not-found';

type Props = {
  pokemons: PokemonData[];
  loader: boolean;
};

export class ResultField extends Component<Props> {
  render() {
    if (!this.props.loader) {
      return <Loader />;
    } else if (this.props.pokemons.length) {
      return (
        <div className="container result-field">
          {this.props.pokemons.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}
