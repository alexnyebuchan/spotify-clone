import { useContext } from 'react';

import styles from '../scss/Home.module.scss';

import testImg from '../../public/images/test/a7.jpg';

import podcastData from '../../yourShows.js';
import albumData from '../../albumData.js';
import recentlyPlayed from '../../recentlyPlayed.js';

import ReleaseCard from '../components/ReleaseCard.js';
import Nav from '../components/Nav.tsx';

import { DataContext } from '../context/DataContext.tsx';

const Home = () => {
  // Good (time of day)
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const { profile, playlists, recents } = useContext(DataContext);

  console.log(playlists.items[0]);

  const uniqueAlbums = new Set();

  const filteredRecents = recents.items.filter((item) => {
    let albumName = item.track.album.name;
    if (albumName.length > 18) {
      albumName = albumName.slice(0, 18) + '...';
    }
    if (!uniqueAlbums.has(albumName)) {
      item.track.album.name = albumName;
      uniqueAlbums.add(albumName);
      return true;
    }
    return false;
  });

  const sixRecents = filteredRecents.slice(0, 6);
  const jumpBackIn = filteredRecents.slice(-5);
  const yourPlaylists = playlists.items.slice(0, 5);

  return (
    <div className={styles.container}>
      <Nav />
      <section className={styles.welcome}>
        <h4>{greeting}</h4>
      </section>
      <section className={styles.recentsContainer}>
        {sixRecents.map((recent_item) => (
          <a className={styles.recentCard} key={recent_item}>
            <img src={recent_item.track.album.images[0].url} alt="/" />
            <span>{recent_item.track.album.name}</span>
          </a>
        ))}
      </section>
      <section className={styles.releaseSection}>
        <h2>Your Shows</h2>
        <div className={styles.cardsContainer}>
          {podcastData.map((podcast) => (
            <ReleaseCard
              key={podcast.id}
              image={podcast.image}
              title={podcast.title}
              artist={podcast.artist}
              link={podcast.link}
            />
          ))}
        </div>
      </section>
      <section className={styles.releaseSection}>
        <h2>Jump Back In</h2>
        <div className={styles.cardsContainer}>
          {jumpBackIn.map((album) => (
            <ReleaseCard
              key={album}
              image={album.track.album.images[0].url}
              title={album.track.album.name}
              artist={album.track.album.artists[0].name}
              // link={album.link}
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
              // link={album.link}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
