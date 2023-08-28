import styles from '../scss/ReleaseCard.module.scss';

const ReleaseCard = ({ image, title, artist, link }) => {
  return (
    <div className={styles.container}>
      <a href={link}>
        <img src={image} alt="/" />
        <h5>{title}</h5>
        <p>{artist}</p>
      </a>
    </div>
  );
};

export default ReleaseCard;
