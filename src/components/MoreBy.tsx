import { useState, useEffect } from 'react';

import { fetchAlbumByArtist } from '../api/Spotify';

import ReleaseCard from './ReleaseCard';

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

  console.log(Albums.items);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>More by {artist}</h2>
          <div>
            {/* <div>
              {Albums.items.map((album) => (
                <ReleaseCard
                  key={album.id}
                  image={album.track.album.images[0].url}
                  title={album.track.album.name}
                  artist={album.track.album.artists[0].name}
                />
              ))}
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default MoreBy;
