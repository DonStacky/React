import clsx from 'clsx';
import image from 'public/image/not-found.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './not-found.module.scss';

export const NotFound = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className={clsx(styles['not-found'], styles.container)}>
      <Image
        src={image}
        alt="not-found"
        className={styles['not-found__image']}
        width={604}
        height={483}
      />
      <div className={styles['not-found__message']}>
        <h1 className={styles['not-found__title']}>Sorry!</h1>
        <p className={styles['not-found__text']}>The page not found</p>
        <p className={styles['not-found__text']}>
          Go{' '}
          <a className={styles['not-found__link']} onClick={handleClick}>
            Back
          </a>{' '}
          or go{' '}
          <Link href="/" className={styles['not-found__link']}>
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
