import styles from '../scss/LibraryItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const LibraryItem = ({ item }) => {
  let displayName = '';
  if (item.type === 'episode') {
    displayName = item.show.publisher;
  } else if (item.type === 'playlist') {
    displayName = item.owner.display_name;
  } else if ((item.type = 'album')) {
    displayName = item.artists[0].name;
  }

  return (
    <Link to="/album" className={styles.container}>
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
    </Link>
  );
};

export default LibraryItem;
