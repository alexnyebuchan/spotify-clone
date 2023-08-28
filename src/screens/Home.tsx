import styles from '../scss/Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import testImg from '../../public/images/test/a7.jpg';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { faCircleDown } from '@fortawesome/free-regular-svg-icons';

const Home = () => {
  return (
    <div className={styles.container}>
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
      <section className={styles.welcome}>Good Afternoon</section>
      <section className={styles.recentsContainer}>
        <a className={styles.recentCard}>
          <img src={testImg} alt="/" />
          <span>Title</span>
        </a>
        <a className={styles.recentCard}>
          <img src={testImg} alt="/" />
          <span>Title</span>
        </a>
        <a className={styles.recentCard}>
          <img src={testImg} alt="/" />
          <span>Title</span>
        </a>
        <a className={styles.recentCard}>
          <img src={testImg} alt="/" />
          <span>Title</span>
        </a>
        <a className={styles.recentCard}>
          <img src={testImg} alt="/" />
          <span>Title</span>
        </a>
        <a className={styles.recentCard}>
          <img src={testImg} alt="/" />
          <span>Title</span>
        </a>
      </section>
    </div>
  );
};

export default Home;
