import { DetailsData } from '../../../shared/types';
import styles from './detailed-card.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  detailsData: DetailsData;
}

export function DetailedCard({ detailsData }: Props) {
  const router = useRouter();
  const { name, image, abilities, types, height, weight, evolutionData } =
    detailsData;

  return (
    <>
      <div
        className={styles['details__overlay']}
        onClick={() => router.back()}
      ></div>
      <div className={styles.details} data-testid="detailed-card">
        <div
          onClick={() => router.back()}
          className={styles['details__btn-box']}
        >
          <button className={styles['details__button']}>x</button>
        </div>
        <h2 className={styles['details__name']}>{name}</h2>
        <Image
          src={image}
          alt=""
          className={styles['details__img']}
          width={500}
          height={500}
        />
        <div className={styles['details__table']}>
          <div className={styles['details__column']}>
            <h3 className={styles['details__title']}>Height</h3>
            <p className={styles['details__text']}>{height}</p>
            <h3 className={styles['details__title']}>Weight</h3>
            <p className={styles['details__text']}>{weight}</p>
            <h3 className={styles['details__title']}>Types</h3>
            <p className={styles['details__text']}>{types}</p>
          </div>
          <div className={styles['details__column']}>
            <h3 className={styles['details__title']}>Ability</h3>
            {abilities.map(([name, text], index) => {
              return (
                <div key={index} className={styles['details__row']}>
                  <p className={styles['details__text']}>{name}</p>
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <h3 className={styles['details__evo-title']}>Stage of evolution</h3>
        <div className={styles['details__evolution']}>
          {evolutionData.map(({ name, image }, index) => {
            return (
              <div
                key={index}
                className={styles['details__evo-imagebox']}
                title={name}
              >
                <Image
                  src={image}
                  alt={name}
                  className={styles['details__evo-image']}
                  width={300}
                  height={300}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
