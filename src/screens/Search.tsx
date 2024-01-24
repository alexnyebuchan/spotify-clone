import { useState, useEffect, useRef, useContext } from 'react';

import styles from '../scss/Search.module.scss';

import Nav from '../components/Nav';

import { DataContext } from '../context/DataContext.tsx';

import { fetchSearch, fetchSingleSearch } from '../api/Spotify';
import { formatQuery } from '../utils/formatting';

import { formatMilliseconds } from '../utils/calculateTime.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedAlbums, setSearchedAlbums] = useState(null);
  const [searchedMain, setSearchedMain] = useState(null);
  const [tag, setTag] = useState('artist')

  const input = useRef();

  const { token } = useContext(DataContext);

  // const fetchDebounced = debounce(fetchData, 5000);

  async function fetchTrackData() {
    const formattedQuery = formatQuery(searchValue);
    const searchData = await fetchSearch(token, formattedQuery);
    
    if (searchData.tracks) {
      setSearchedAlbums(searchData);
    }
  }

  async function fetchMainData() {
    console.log(tag)
    const formattedQuery = formatQuery(searchValue);
    const searchData = await fetchSingleSearch(token, formattedQuery, tag);
    console.log(searchData)
    
   
  }

  useEffect(() => {
    if (searchValue){
      fetchTrackData();
      fetchMainData()
    }
  
  }, [searchValue]);

  const setInputValue = (input) => {
    setSearchValue(input.target.value);
  };

  function handleTag(type){
    setTag(type)
  }


  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.tags}>
        <p>Search by:</p>
        <ul>
          <li onClick={() => handleTag('artist')}>Artist</li>
          <li onClick={() => handleTag('album')}>Album</li>
          <li onClick={() => handleTag('track')}>Track</li>
          <li onClick={() => handleTag('playlist')}>Playlist</li>
        </ul>
      </div>
      <div className={styles.inputContainer}>
        <FontAwesomeIcon className={styles.icon}
            id="faIcon"
            target="_blank"
            icon={faSearch}
            />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          onChange={setInputValue}
          ref={input}
          value={searchValue}
          className={styles.input}
        />
      </div>
      {!searchedAlbums ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.resultsContainer}>
          <div className={styles.topResults}>
            <h2>Top Results</h2>
            <div>
              {/* <img src="" alt="" /> */}
              <h3>{searchedAlbums.tracks.items[0].artists[0].name}</h3>
              <h4>Artist</h4>
            </div>
          </div>
          <div className={styles.songs}>
            <h2>Songs</h2>
            <ul>
              {searchedAlbums.tracks.items.slice(0,4).map((track, index) => (
                <li key={index}>
                  <div className={styles.imgInfoContainer}>
                    <div>
                      <img src={track.album.images[2].url} alt="/" />
                    </div>
                    <div>
                      <h4>{track.name}</h4>
                      <p>{track.artists[0].name}</p>
                    </div>
                  </div>
                  <div>
                    {formatMilliseconds(track.duration_ms, 'minSec')}
                  </div>
                </li>
              ))}
              
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
