import { useContext, useState } from 'react';

import styles from '../scss/Sidebar.module.scss';

import LibraryItem from './LibraryItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DataContext } from '../context/DataContext.tsx';

import { Link } from 'react-router-dom';

import {
  faSearch,
  faCaretDown,
  faPlus,
  faArrowRight,
  faHouse,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [selectedType, setSelectedType] = useState();
  const [inputVisible, setInputVisible] = useState(false);

  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

  const { playlists, episodes, albums, artists } = useContext(DataContext);

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

  const filteredItems = combinedItems.filter((item) => {
    return selectedType ? item.type === selectedType : true;
  });

  const handleCategorisation = (type, e) => {
    e.preventDefault();
    setSelectedType(type);
  };

  return (
    <div className={styles.container}>
      <section className={styles.nav}>
        <div className={styles.navItems}>
          <Link to="/">
            <FontAwesomeIcon
              className={styles.houseIcon}
              id="faIcon"
              target="_blank"
              icon={faHouse}
            />
            Home
          </Link>
          <Link to="/search">
            <FontAwesomeIcon
              className={styles.magIcon}
              id="faIcon"
              target="_blank"
              icon={faMagnifyingGlass}
            />
            Search
          </Link>
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
            <Link to="/" onClick={(e) => handleCategorisation('episode', e)}>
              Playlists
            </Link>
            <Link to="/" onClick={(e) => handleCategorisation('episode', e)}>
              Artists
            </Link>
            <Link to="/" onClick={(e) => handleCategorisation('album', e)}>
              Albums
            </Link>
            <Link to="/" onClick={(e) => handleCategorisation('playlist', e)}>
              Podcasts
            </Link>
          </div>
          <div className={styles.recents}>
            <div>
              <Link to="/">
                <FontAwesomeIcon
                  className={styles.searchIcon}
                  onClick={toggleInputVisible}
                  id="faIcon"
                  target="_blank"
                  icon={faSearch}
                />
              </Link>
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
            {filteredItems.map((item) => (
              <LibraryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
