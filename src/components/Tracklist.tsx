import styles from '../scss/Tracklist.module.scss';

import { formatMilliseconds } from '../utils/calculateTime';

const Tracklist = ({ tracks }) => {
  return (
    <div className={styles.container}>
      <tr className={styles.header}>
        <div className={styles.noAndTitle}>
          <th className={styles.no}>#</th>
          <th>Title</th>
        </div>
        <th>Length</th>
      </tr>
      {tracks.map((track) => (
        <tr className={styles.trackContainer} key={track.id}>
          <div>
            <td className={styles.no}>{track.track_number}</td>
            <td className={styles.title}>
              <span>{track.name}</span>
              {track.artists[0].name}
            </td>
          </div>
          <td className={styles.time}>
            {formatMilliseconds(track.duration_ms, 'simple')}
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Tracklist;
