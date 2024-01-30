import './App.css';
import './scss/main.scss';

import Layout from './components/Layout';
import Home from './screens/Home';
import Album from './screens/Album.tsx';
import Search from './screens/Search.tsx';

import { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AudioContext } from './context/AudioContext.tsx';
import { DataContext } from './context/DataContext.tsx';

import audioReducer from './context/AudioReducer.tsx';
import UserProvider from './context/UserProvider.tsx';

import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchProfile,
  fetchPlaylists,
  fetchRecents,
  fetchEpisodes,
  fetchAlbums,
  fetchArtists,
} from './api/Spotify.tsx'; // Import your Spotify-related functions

// const profileData = await fetchProfile(accessToken);
          // if (profileData.display_name) {
          //   setProfile(profileData);
          // }

          // const playlistsData = await fetchPlaylists(accessToken);
          // if (playlistsData.total) {
          //   setPlaylists(playlistsData);
          // }

          // const recentsData = await fetchRecents(accessToken);
          // if (recentsData.limit) {
          //   setRecents(recentsData);
          // }

          // const episodesData = await fetchEpisodes(accessToken);
          // if (episodesData.href) {
          //   setEpisodes(episodesData);
          // }

          // const albumsData = await fetchAlbums(accessToken);
          // if (albumsData.href) {
          //   setAlbums(albumsData);
          // }

          // const artistsData = await fetchArtists(accessToken);
          // if (artistsData.name) {
          //   setArtists(artistsData);
          // }

          // window.history.pushState({}, null, '/');

function App() {
  // const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [recents, setRecents] = useState(null);
  const [episodes, setEpisodes] = useState({});
  const [albums, setAlbums] = useState({});
  const [artists, setArtists] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchData() {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        try {
          const accessToken: string = await getAccessToken(clientId, code);
          window.sessionStorage.setItem("token", JSON.stringify(accessToken));         
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, []);

  const initialState = {
    title: 'None',
    audio: null,
    loading: false,
    playing: false,
  };

  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <UserProvider>
      <Router>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataContext.Provider
            value={{
              playlists,
              recents,
              episodes,
              albums,
              artists,
            }}
          >
            <AudioContext.Provider value={{ state, dispatch }}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/album" element={<Album />} />
                  <Route path="/album/:id" element={<Album />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
              </Layout>
            </AudioContext.Provider>
          </DataContext.Provider>
        )}
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
