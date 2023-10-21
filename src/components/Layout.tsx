// import { useContext } from 'react';

// import { AudioContext } from '../context/AudioContext.tsx';
import Sidebar from './Sidebar.tsx';
import AudioPlayer from './AudioPlayer';
import ArtistSection from './ArtistSection.tsx';

import styles from '../scss/Layout.module.scss';

const Layout = ({ children }) => {
  // const { state } = useContext(AudioContext);

  return (
    <>
      <div className={styles.layoutContainer}>
        {/* <title>{state.title}</title> */}
        <section className={styles.sidebarContainer}>
          <Sidebar />
        </section>
        <section className={styles.screenContainer}>{children}</section>
        <section className={styles.artistContainer}>
          <ArtistSection />
        </section>
      </div>
      <AudioPlayer />
    </>
  );
};

export default Layout;
