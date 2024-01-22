import { useContext } from 'react';

import { Link } from 'react-router-dom';

import styles from '../scss/Home.module.scss';

import RecentCard from '../components/RecentCard.js';
import ReleaseCard from '../components/ReleaseCard.js';
import Nav from '../components/Nav.tsx';

import { DataContext } from '../context/DataContext.tsx';

import { shortenString } from '../utils/formatting.tsx';

const Home = () => {
  // Good (time of day)
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  let amountOfCards = 7;

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const { playlists, recents, episodes, albums } = useContext(DataContext);

  const uniqueAlbums = new Set();
  const uniqueEpisodes = new Set();

  const filteredRecents = recents.items.filter((item) => {
    item.track.album.name = shortenString(item.track.album.name);

    if (!uniqueAlbums.has(item.track.album.name)) {
      uniqueAlbums.add(item.track.album.name);
      return true;
    }
    return false;
  });

  const filteredEpisodes = episodes.items.filter((item) => {
    item.episode.show.name = shortenString(item.episode.show.name);

    if (!uniqueEpisodes.has(item.episode.show.name)) {
      uniqueEpisodes.add(item.episode.show.name);
      return true;
    }
    return false;
  });

  const shortenedAlbums = albums.items.forEach((item) => {
    item.album.name = shortenString(item.album.name);
  });

  const sixRecents = filteredRecents.slice(0, 6);
  const jumpBackIn = filteredRecents.slice(-amountOfCards);
  const yourPlaylists = playlists.items.slice(0, amountOfCards);
  const yourAlbums = albums.items.slice(0, amountOfCards);



  return (
    <div className={styles.container}>
      <Nav />
      <section className={styles.welcome}>
        <h4>{greeting}</h4>
      </section>
      <section className={styles.recentsContainer}>
        {sixRecents.map((recent_item) => (
          <RecentCard  
          key={recent_item.track.id} 
          id={recent_item.track.album.id} 
          image={recent_item.track.album.images[0].url} 
          title={recent_item.track.album.name}
          />
        ))}
      </section>
      <section className={styles.releaseSection}>
        <h2>Your Albums</h2>
        <div className={styles.cardsContainer}>
          {yourAlbums.map((item) => (
            <ReleaseCard
              key={item.album.id}
              image={item.album.images[0].url}
              title={item.album.name}
              artist={item.album.artists[0].name}
              id={item.album.id}
            />
          ))}
        </div>
      </section>
      <section className={styles.releaseSection}>
        <h2>Your Playlists</h2>
        <div className={styles.cardsContainer}>
          {yourPlaylists.map((playlist) => (
            <ReleaseCard
              key={playlist.id}
              image={playlist.images[0].url}
              title={playlist.name}
              artist={playlist.type}
            />
          ))}
        </div>
      </section>
      <section className={styles.releaseSection}>
        <h2>Jump Back In</h2>
        <div className={styles.cardsContainer}>
          {jumpBackIn.map((album) => (
            <ReleaseCard
              key={album.track.id}
              image={album.track.album.images[0].url}
              title={album.track.album.name}
              artist={album.track.album.artists[0].name}
              id={album.track.album.id}
            />
          ))}
        </div>
      </section>
      <section className={styles.releaseSection}>
        <h2>Your Shows</h2>
        <div className={styles.cardsContainer}>
          {filteredEpisodes.map((show) => (
            <ReleaseCard
              key={show.episode.id}
              image={show.episode.images[0].url}
              title={show.episode.show.name}
              artist={show.episode.show.publisher}
              // link={podcast.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
