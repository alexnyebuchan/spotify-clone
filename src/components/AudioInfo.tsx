import styles from '../scss/AudioInfo.module.scss';

import { useState } from 'react';

import testImg from '../../public/images/test/a7.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const AudioInfo = () => {
  const [liked, setLiked] = useState(false);

  const handleLiked = (e) => {
    e.preventDefault();
    const prevValue = liked;
    setLiked(!prevValue);
  };

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
        {!liked ? (
          <FontAwesomeIcon
            className={styles.heart}
            id="faIcon"
            target="_blank"
            icon={farHeart}
            onClick={handleLiked}
          />
        ) : (
          <FontAwesomeIcon
            className={styles.liked}
            id="faIcon"
            target="_blank"
            icon={fasHeart}
            onClick={handleLiked}
          />
        )}
      </section>
    </div>
  );
};

export default AudioInfo;
