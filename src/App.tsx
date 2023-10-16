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

function App() {
  const [profile, setProfile] = useState(null);
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
          if (accessToken) {
            setToken(accessToken);
          }

          const profileData = await fetchProfile(accessToken);
          if (profileData.display_name) {
            setProfile(profileData);
          }

          const playlistsData = await fetchPlaylists(accessToken);
          if (playlistsData.total) {
            setPlaylists(playlistsData);
          }

          const recentsData = await fetchRecents(accessToken);
          if (recentsData.limit) {
            setRecents(recentsData);
          }

          const episodesData = await fetchEpisodes(accessToken);
          if (episodesData.href) {
            setEpisodes(episodesData);
          }

          const albumsData = await fetchAlbums(accessToken);
          if (albumsData.href) {
            setAlbums(albumsData);
          }

          const artistsData = await fetchArtists(accessToken);
          if (artistsData.href) {
            setArtists(artistsData);
            console.log(artists);
          }

          window.history.pushState({}, null, '/');
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
    <Router>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataContext.Provider
            value={{
              profile,
              playlists,
              recents,
              episodes,
              albums,
              artists,
              token,
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
  );
}

export default App;
