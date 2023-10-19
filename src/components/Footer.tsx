import { formatDate } from '../utils/calculateDate';
import { formatCopyright } from '../utils/formatting';

import styles from '../scss/Footer.module.scss';

const Footer = ({ copyrights, date }) => {
  return (
    <div className={styles.container}>
      <div>{date.length > 4 ? formatDate(date) : date}</div>
      <div className={styles.copyContainer}>
        {copyrights.map((copyright) => (
          <span>{formatCopyright(copyright.text, copyright.type)}</span>
        ))}
      </div>
    </div>
  );
};

export default Footer;
