import { useState, useEffect, useRef, useContext } from 'react';

import styles from '../scss/Search.module.scss';

import Nav from '../components/Nav';

import { DataContext } from '../context/DataContext.tsx';

import { fetchSearch } from '../api/Spotify';
import { formatQuery } from '../utils/formatting';

import debounce from 'lodash/debounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedAlbums, setSearchedAlbums] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const input = useRef();

  const { token } = useContext(DataContext);

  // const fetchDebounced = debounce(fetchData, 5000);

  async function fetchData() {
    const formattedQuery = formatQuery(searchValue);
    const searchData = await fetchSearch(token, formattedQuery);


    if (searchData.albums) {
      setSearchedAlbums(searchData);
      setIsLoading(false);
      console.log(searchData)
    }
  }

  useEffect(() => {
    if (searchValue){
      fetchData();
    }
  
  }, [searchValue]);

  const setInputValue = (input) => {
    setSearchValue(input.target.value);
  };


  return (
    <div className={styles.container}>
      <Nav />
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
              {/* <h3>{searchedAlbums.albums.items[0].artists[0].name}</h3> */}
              <h4>Type</h4>
            </div>
          </div>
          <div className={styles.songs}>
            <h2>Songs</h2>
            <ul>
              <li>
                {/* img */}
                <h4>Track title</h4>
                <p>Track title</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
