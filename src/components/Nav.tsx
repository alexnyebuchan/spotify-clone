import { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { faCircleDown } from '@fortawesome/free-regular-svg-icons';

import styles from '../scss/Nav.module.scss';

import { DataContext } from '../context/DataContext.tsx';

const Nav = () => {
  const { profile } = useContext(DataContext);

  return (
    <section className={styles.top}>
      <div className={styles.chevrons}>
        <a href="/">
          <FontAwesomeIcon
            className={styles.chevron}
            id="faIcon"
            target="_blank"
            icon={faChevronLeft}
          />
        </a>
        <a href="/">
          <FontAwesomeIcon
            className={styles.chevron}
            id="faIcon"
            target="_blank"
            icon={faChevronRight}
          />
        </a>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.install}>
          <a href="/">
            <FontAwesomeIcon
              className={styles.downloadIcon}
              id="faIcon"
              target="_blank"
              icon={faCircleDown}
            />
            Install App
          </a>
        </div>
        <div>
          <a className={styles.profileIcon} href="/">
            <FontAwesomeIcon
              className={styles.downloadIcon}
              id="faIcon"
              target="_blank"
              icon={faUser}
            />
          </a>
          <p>{profile.display_name}</p>
        </div>
      </div>
    </section>
  );
};

export default Nav;
