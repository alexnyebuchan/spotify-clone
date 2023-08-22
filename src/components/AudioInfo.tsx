import styles from '../scss/AudioInfo.module.scss';

import testImg from '../../public/images/test/a7.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart } from '@fortawesome/free-regular-svg-icons';

const AudioInfo = () => {
  return (
    <div className={styles.container}>
      <section>
        <img src={testImg} alt="/" />
      </section>
      <section className={styles.text}>
        <a className={styles.title} href="/">
          Track title
        </a>
        <a className={styles.artist} href="/">
          Artist
        </a>
      </section>
      <section>
        <FontAwesomeIcon
          className={styles.heart}
          id="faIcon"
          target="_blank"
          icon={faHeart}
        />
      </section>
    </div>
  );
};

export default AudioInfo;
