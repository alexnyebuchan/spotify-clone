import { useContext, useState } from 'react';

import styles from '../scss/Sidebar.module.scss';

import data from '../../testData.js';

import LibraryItem from './LibraryItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DataContext } from '../context/DataContext.tsx';

import CustomLink from './CustomLink.tsx';

import {
  faSearch,
  faCaretDown,
  faPlus,
  faArrowRight,
  faHouse,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [inputVisible, setInputVisible] = useState(false);

  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

  const { playlists, episodes, albums } = useContext(DataContext);

  const combinedItems = [];

  const minLength = Math.min(
    playlists.items.length,
    albums.items.length,
    episodes.items.length
  );

  for (let i = 0; i < minLength; i++) {
    combinedItems.push(
      playlists.items[i],
      albums.items[i].album,
      episodes.items[i].episode
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.nav}>
        <div className={styles.navItems}>
          <a href="/">
            <FontAwesomeIcon
              className={styles.houseIcon}
              id="faIcon"
              target="_blank"
              icon={faHouse}
            />
            Home
          </a>
          <a href="/">
            <FontAwesomeIcon
              className={styles.magIcon}
              id="faIcon"
              target="_blank"
              icon={faMagnifyingGlass}
            />
            Search
          </a>
        </div>
      </section>
      <section className={styles.library}>
        <div>
          <span>
            <a className={styles.yourLibrary} href="/">
              Your Library
            </a>
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
            <CustomLink to="/">Playlists</CustomLink>
            <CustomLink to="/">Artists</CustomLink>
            <CustomLink to="/">Albums</CustomLink>
            <CustomLink to="/">Podcasts</CustomLink>
          </div>
          <div className={styles.recents}>
            <div>
              <CustomLink to="/">
                <FontAwesomeIcon
                  className={styles.searchIcon}
                  onClick={toggleInputVisible}
                  id="faIcon"
                  target="_blank"
                  icon={faSearch}
                />
              </CustomLink>
              {inputVisible && (
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Search in your library"
                  style={{ opacity: inputVisible ? 1 : 0 }}
                />
              )}
            </div>
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
            {combinedItems.map((item) => (
              <LibraryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
