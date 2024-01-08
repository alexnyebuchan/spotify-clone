import styles from '../scss/RecentCard.module.scss';

import { Link } from 'react-router-dom';

const RecentCard = ({ image, title, id }) => {
  return (
    <Link className={styles.recentCard} to={`/album/${id}`}>
      <img src={image} alt="/" />
        <span>{title}</span>
    </Link>
  );
};

export default RecentCard;
