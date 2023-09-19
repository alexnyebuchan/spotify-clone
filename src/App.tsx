import './App.css';
import './scss/main.scss';
import Layout from './components/Layout';
import Home from './screens/Home';

import { useReducer, useEffect, useState } from 'react';
import { AudioContext } from './context/AudioContext.tsx';
import audioReducer from './context/AudioReducer.tsx';

import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchProfile,
  fetchPlaylists,
  fetchRecents,
} from './api/Spotify.tsx'; // Import your Spotify-related functions

function App() {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const clientId = 'af3fedc28ef44c2fa737b0201f4b7ca7';
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);

        const profile = await fetchProfile(accessToken);
        setProfile(profile);

        const playlists = await fetchPlaylists(accessToken);
        setPlaylists(playlists);

        const recents = await fetchRecents(accessToken);
        console.log(recents);
        setRecentlyPlayed(recents);
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
    <>
      <div>
        <AudioContext.Provider value={{ state, dispatch }}>
          <Layout>
            <Home />
          </Layout>
        </AudioContext.Provider>
      </div>
    </>
  );
}

export default App;
