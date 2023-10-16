import { useEffect, useState, useContext } from 'react';

import { DataContext } from '../context/DataContext.tsx';

import Nav from '../components/Nav.tsx';

import styles from '../scss/Album.module.scss';

import { fetchSingleAlbum } from '../api/Spotify.tsx';

const Album = () => {
  const params = window.location.pathname.split('/');
  const albumId = params[params.length - 1];

  const [currentAlbum, setCurrentAlbum] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  let albumLength: number = 0;
  console.log(albumLength);

  function formatMilliseconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours} hr `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min `;
    }
    formattedTime += `${seconds} sec`;

    return formattedTime;
  }

  return (
    <div className={styles.container}>
      <Nav />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
                  {formatMilliseconds(albumLength)}
                </span>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Album;
