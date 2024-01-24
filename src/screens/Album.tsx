import { useEffect, useState, useContext, useRef } from 'react';

import { useParams } from 'react-router-dom';


import { DataContext } from '../context/DataContext.tsx';

import Nav from '../components/Nav.tsx';
import Tracklist from '../components/Tracklist.tsx';
import Footer from '../components/Footer.tsx';
import MoreBy from '../components/MoreBy.tsx';

import styles from '../scss/Album.module.scss';


import { fetchSingleAlbum } from '../api/Spotify.tsx';
import { formatMilliseconds } from '../utils/calculateTime.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const Album = () => {
  const params = useParams();
  const albumId = params.id;

  const [currentAlbum, setCurrentAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0)

  const containerRef = useRef(null);

  const { token } = useContext(DataContext);

  async function fetchData() {
    const albumData = await fetchSingleAlbum(token, albumId);
    if (albumData.href) {
      setCurrentAlbum(albumData);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    containerRef.current.scrollTop = 0;
  }, [params]);

  useEffect(() => {
    const logScrollPosition = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollTop)
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', logScrollPosition);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', logScrollPosition);
      }
    };
  }, []);

  let albumLength: number = 0;


  return (
    <div id={top} className={styles.container} ref={containerRef}>
      <Nav scrollPosition={scrollPosition} />
      <div className={styles.notNav}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section className={styles.info}>
            <div className={styles.imgContainer}>
              <img src={currentAlbum.images[0].url} alt="/" />
            </div>
            <div className={styles.infoContainer}>
              <p>Album</p>
              <h2>{currentAlbum.name}</h2>
              <div className={styles.additional}>
                <p>
                  {currentAlbum.artists[0].name} .{' '}
                  {currentAlbum.release_date.slice(0, 4)} .{' '}
                  {currentAlbum.tracks.items.length} songs .{' '}
                  <span>
                    {currentAlbum.tracks.items.forEach((track) => {
                      length = track.duration_ms;
                      albumLength += length;
                    })}
                    {formatMilliseconds(albumLength, 'minSec')}
                  </span>
                </p>
              </div>
            </div>
          </section>
          <section className={styles.icons}>
            <FontAwesomeIcon
              className={styles.play}
              id="faIcon"
              target="_blank"
              icon={faPlay}
            />
            <FontAwesomeIcon
              className={styles.heart}
              id="faIcon"
              target="_blank"
              icon={farHeart}
            />
            <FontAwesomeIcon
              className={styles.ellipsis}
              id="faIcon"
              target="_blank"
              icon={faEllipsis}
            />
          </section>
          <Tracklist tracks={currentAlbum.tracks.items} />
          <Footer
            copyrights={currentAlbum.copyrights}
            date={currentAlbum.release_date}
          />
          <MoreBy
            artist={currentAlbum.artists[0].name}
            id={currentAlbum.artists[0].id}
            token={token}
          />
        </>
      )}
      </div>
    </div>
  );
};

export default Album;
