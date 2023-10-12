import './App.css';
import './scss/main.scss';
import Layout from './components/Layout';
import Home from './screens/Home';

import { useReducer, useEffect, useState } from 'react';
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
} from './api/Spotify.tsx'; // Import your Spotify-related functions

function App() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [recents, setRecents] = useState(null);
  const [episodes, setEpisodes] = useState({});
  const [albums, setAlbums] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const clientId = 'af3fedc28ef44c2fa737b0201f4b7ca7';
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        try {
          const accessToken = await getAccessToken(clientId, code);

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
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataContext.Provider
          value={{ profile, playlists, recents, episodes, albums }}
        >
          <AudioContext.Provider value={{ state, dispatch }}>
            <Layout>
              <Home />
            </Layout>
          </AudioContext.Provider>
        </DataContext.Provider>
      )}
    </div>
  );
}

export default App;
