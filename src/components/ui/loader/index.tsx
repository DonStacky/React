import styles from './loader.module.scss';
import { Image } from 'next/dist/client/image-component';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image
        src="/image/pokeball.png"
        alt="pokeball-loader"
        width={300}
        height={300}
      />
    </div>
  );
};
