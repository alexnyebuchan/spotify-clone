import { useState, useEffect } from 'react';

import { fetchAlbumByArtist } from '../api/Spotify';
import { shortenString } from '../utils/formatting';

import ReleaseCard from './ReleaseCard';

import styles from '../scss/MoreBy.module.scss';

const MoreBy = ({ artist, id, token }) => {
  const [Albums, setAlbums] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(id) {
    const albumData = await fetchAlbumByArtist(token, id);
    if (albumData.href) {
      setAlbums(albumData);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.container}>
          <h2>More by {artist}</h2>
          <div>
            <div className={styles.cardContainer}>
              {Albums.items.map((album) => (
                <ReleaseCard
                  key={album.id}
                  id={album.id}
                  image={album.images[0].url}
                  title={shortenString(album.name)}
                  artist={artist}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoreBy;
