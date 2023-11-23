import React from 'react';
import { ErrorBoundary } from '../../model/error-boundary';
import { ErrorButton } from '../error-button';
import styles from './card.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

type CardProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  page: number;
};

export const Card = ({ id, name, description, image, page }: CardProps) => {
  const { push } = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON') return;

    push(`/page/${page}/details/${id}`);
  };

  return (
    <ErrorBoundary page={page}>
      <div className={styles.card} data-testid="card" onClick={handleClick}>
        <div className={styles.card__imgbox}>
          <Image
            className={styles.card__img}
            src={image}
            alt={name}
            width={300}
            height={300}
          />
        </div>
        <h3 className={styles.card__title}>{name}</h3>
        <p className={styles.card__text}>{description}</p>
        <ErrorButton />
      </div>
    </ErrorBoundary>
  );
};
