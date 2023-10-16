import styles from '../scss/ReleaseCard.module.scss';

import { Link } from 'react-router-dom';

const ReleaseCard = ({ image, title, artist, id }) => {
  return (
    <Link to={`/album/${id}`}>
      <div className={styles.container}>
        <img src={image} alt="/" />
        <h5>{title}</h5>
        <p>{artist}</p>
      </div>
    </Link>
  );
};

export default ReleaseCard;
