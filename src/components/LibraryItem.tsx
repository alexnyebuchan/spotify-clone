import styles from '../scss/LibraryItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

const LibraryItem = ({ item }) => {
  // Get the artist, publisher or playlist creator of each item
  let displayName = '';
  if (item.type === 'episode') {
    displayName = item.show.publisher;
  } else if (item.type === 'playlist') {
    displayName = item.owner.display_name;
  } else if ((item.type = 'album')) {
    displayName = item.artists[0].name;
  }

  return (
    <a href="/" className={styles.container}>
      <section>
        <img src={item.images[0].url} alt="/" />
      </section>
      <section className={styles.text}>
        <text className={styles.title}>{item.name}</text>
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
          <text className={styles.secondary}>{displayName}</text>
        </div>
      </section>
    </a>
  );
};

export default LibraryItem;
