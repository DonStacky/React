import { Component } from 'react';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import './result-field.scss';
import { PokemonData } from '../../../shared/types';
import { NotFound } from '../not-found/not-found';

const POKEMONS_LIMIT = 8;

type Props = {
  pokemons: PokemonData[] | boolean;
};

export class ResultField extends Component<Props> {
  render() {
    if (this.props.pokemons === true) {
      return <Loader></Loader>;
    } else if (this.props.pokemons === false) {
      return <NotFound />;
    } else {
      return (
        <div className="container result-field">
          {this.props.pokemons.slice(0, POKEMONS_LIMIT).map((item) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
            ></Card>
          ))}
        </div>
      );
    }
  }
}
