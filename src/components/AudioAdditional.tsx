import { useState } from 'react';

import styles from '../scss/AudioAdditional.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const AudioAdditional = () => {
  const [volume, setVolume] = useState(100);
  const [showVolume, setShowVolume] = useState(false);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    // audioPlayer.current.volume = event.target.value / 100;
  };

  const handleVolumeButton = () => {
    const prevValue = showVolume;
    setShowVolume(!prevValue);
  };
  return (
    <div className={styles.Vol}>
      <div>
        <a onClick={handleVolumeButton}>
          {volume > 0 ? (
            <FontAwesomeIcon
              className={styles.volumeBtn}
              id="faIcon"
              target="_blank"
              icon={faVolumeHigh}
            />
          ) : (
            <FontAwesomeIcon
              className={styles.volumeBtn}
              id="faIcon"
              target="_blank"
              icon={faVolumeMute}
            />
          )}
        </a>

        {showVolume && (
          <span className={styles.volume}>
            <input
              className={styles.volumeInput}
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default AudioAdditional;
