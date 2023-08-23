import styles from '../scss/Sidebar.module.scss';

import data from '../../testData.js';

import LibraryItem from './LibraryItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSearch,
  faCaretDown,
  faPlus,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <section className={styles.nav}>
        <div className={styles.navItems}>
          <a href="/">Home</a>
          <a href="/">Search</a>
        </div>
      </section>
      <section className={styles.library}>
        <div>
          <span>
            <a href="/">Your Library</a>
            <div>
              <FontAwesomeIcon
                className={styles.libraryOptions}
                id="faIcon"
                target="_blank"
                icon={faPlus}
              />
              <FontAwesomeIcon
                className={styles.libraryOptions}
                id="faIcon"
                target="_blank"
                icon={faArrowRight}
              />
            </div>
          </span>
          <div className={styles.type}>
            <a href="/">Playlists</a>
            <a href="/">Artists</a>
            <a href="/">Albums</a>
            <a href="/">Podcasts</a>
          </div>
          <div className={styles.recents}>
            <a href="/">
              <FontAwesomeIcon
                className={styles.searchIcon}
                id="faIcon"
                target="_blank"
                icon={faSearch}
              />
            </a>
            <a href="/">
              Recents
              <FontAwesomeIcon
                className={styles.caretIcon}
                id="faIcon"
                target="_blank"
                icon={faCaretDown}
              />
            </a>
          </div>
          <div>
            {data.map((item) => (
              <LibraryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
