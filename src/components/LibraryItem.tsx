import styles from '../scss/LibraryItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

const LibraryItem = ({ item }) => {
  return (
    <a href="/" className={styles.container}>
      <section>
        <img src={item.image} alt="/" />
      </section>
      <section className={styles.text}>
        <text className={styles.title}>{item.id}</text>
        <div>
          <text className={styles.secondary}>{item.type}</text>
          <text className={styles.periodContainer}>
            <FontAwesomeIcon
              className={styles.period}
              id="faIcon"
              target="_blank"
              icon={faCircle}
            />
          </text>
          <text className={styles.secondary}>{item.artist}</text>
        </div>
      </section>
    </a>
  );
};

export default LibraryItem;
