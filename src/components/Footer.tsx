import { formatDate } from '../utils/calculateDate';

import styles from '../scss/Footer.module.scss';

const Footer = ({ copyrights, date }) => {
  const formatCopyright = (copyright) => {
    const symbol = copyright.slice(0, 3);
    const text = copyright.slice(3, -1);
    let updatedSymbol;
    if (symbol === '(P)') {
      updatedSymbol = '℗';
    } else if (symbol === '(C)') {
      updatedSymbol = '©';
    } else {
      return copyright;
    }
    return `${updatedSymbol} ${text}`;
  };

  return (
    <div className={styles.container}>
      <div>{date.length > 4 ? formatDate(date) : date}</div>
      <div className={styles.copyContainer}>
        {copyrights.map((copyright) => (
          <span>{formatCopyright(copyright.text)}</span>
        ))}
      </div>
    </div>
  );
};

export default Footer;
