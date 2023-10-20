import { useState, useEffect, useRef, useContext } from 'react';

import styles from '../scss/Search.module.scss';

import Nav from '../components/Nav';

import { DataContext } from '../context/DataContext.tsx';

import { fetchSearch } from '../api/Spotify';
import { formatQuery } from '../utils/formatting';

import debounce from 'lodash/debounce';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedAlbums, setSearchedAlbums] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const input = useRef();

  const { token } = useContext(DataContext);

  const fetchDebounced = debounce(fetchData, 5000);

  async function fetchData() {
    const formattedQuery = formatQuery(searchValue);
    const searchData = await fetchSearch(token, formattedQuery);

    if (searchData.albums) {
      setSearchedAlbums(searchData);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // fetchDebounced();
  }, [searchValue]);

  const setInputValue = (input) => {
    setSearchValue(input.target.value);
  };

  console.log(searchedAlbums);

  return (
    <div className={styles.container}>
      <Nav />
      <input
        type="text"
        placeholder="What do you want to listen to?"
        onChange={setInputValue}
        ref={input}
        value={searchValue}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{searchValue}</h1>
          {/* <h1>{searchedAlbums.albums[0].items[0].name}</h1> */}
        </div>
      )}
    </div>
  );
};

export default Search;
