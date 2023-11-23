import { Card } from '../card';
import styles from './card-list.module.scss';
import { PokemonData } from '../../../shared/types';
import { ReactNode } from 'react';

interface Props {
  pageItems: PokemonData[];
  currentPage: number;
  children?: ReactNode;
}

export const CardList = ({ pageItems, currentPage, children }: Props) => {
  return (
    <div className={styles['card-list']} data-testid="card-list">
      {pageItems.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
          page={currentPage}
        />
      ))}
      {children}
    </div>
  );
};
