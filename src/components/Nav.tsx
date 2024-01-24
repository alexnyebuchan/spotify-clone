import { useContext } from 'react';

import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { faCircleDown } from '@fortawesome/free-regular-svg-icons';

import styles from '../scss/Nav.module.scss';

import { DataContext } from '../context/DataContext.tsx';

const Nav = ({scrollPosition}) => {
  const { profile } = useContext(DataContext);

  console.log(scrollPosition)

  const navigate = useNavigate();

  function handleNavBack() {
    navigate(-1);
  }

  function handleNavFwd() {
    navigate(1);
  }


  return (
    <section className={styles.top} id={scrollPosition > 0 ? styles.navScrolled : ''}>
      <div className={styles.chevrons}>
        <span onClick={handleNavBack}>
          <FontAwesomeIcon
            className={styles.chevron}
            id="faIcon"
            target="_blank"
            icon={faChevronLeft}
          />
        </span>
        <span onClick={handleNavFwd}>
          <FontAwesomeIcon
            className={styles.chevron}
            id="faIcon"
            target="_blank"
            icon={faChevronRight}
          />
        </span>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.install}>
          <a href="/">
            <FontAwesomeIcon
              className={styles.downloadIcon}
              id="faIcon"
              target="_blank"
              icon={faCircleDown}
            />
            Install App
          </a>
        </div>
        <div>
          <a className={styles.profileIcon} href="/">
            <FontAwesomeIcon
              className={styles.downloadIcon}
              id="faIcon"
              target="_blank"
              icon={faUser}
            />
          </a>
          <p>{profile.display_name}</p>
        </div>
      </div>
    </section>
  );
};

export default Nav;
