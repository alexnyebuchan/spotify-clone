import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { faCircleDown } from '@fortawesome/free-regular-svg-icons';

import styles from '../scss/Nav.module.scss';

const Nav = () => {
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
    </section>
  );
};

export default Nav;
