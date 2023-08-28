import styles from '../scss/Home.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import testImg from '../../public/images/test/a7.jpg';

import podcastData from '../../yourShows.js';
import albumData from '../../albumData.js';
import recentlyPlayed from '../../recentlyPlayed.js';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import ReleaseCard from '../components/ReleaseCard.js';

const Home = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

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
      <section className={styles.welcome}>
        <h4>{greeting}</h4>
      </section>
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
      <section className={styles.releaseSection}>
        <h2>Your Shows</h2>
        <div className={styles.cardsContainer}>
          {podcastData.map((podcast) => (
            <ReleaseCard
              key={podcast.id}
              image={podcast.image}
              title={podcast.title}
              artist={podcast.artist}
              link={podcast.link}
            />
          ))}
        </div>
      </section>
      <section className={styles.releaseSection}>
        <h2>Jump Back In</h2>
        <div className={styles.cardsContainer}>
          {albumData.map((album) => (
            <ReleaseCard
              key={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
              link={album.link}
            />
          ))}
        </div>
      </section>
      <section className={styles.releaseSection}>
        <h2>Recently Played</h2>
        <div className={styles.cardsContainer}>
          {albumData.map((album) => (
            <ReleaseCard
              key={album.id}
              image={album.image}
              title={album.title}
              artist={album.artist}
              link={album.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
