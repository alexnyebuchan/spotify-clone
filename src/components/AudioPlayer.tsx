import AudioControls from './AudioControls';
import AudioInfo from './AudioInfo';
import AudioAdditional from './AudioAdditional';

import styles from '../scss/AudioPlayer.module.scss';

const AudioPlayer = () => {
  return (
    <div className={styles.container}>
      <AudioInfo />
      <AudioControls />
      <AudioAdditional />
    </div>
  );
};

export default AudioPlayer;
