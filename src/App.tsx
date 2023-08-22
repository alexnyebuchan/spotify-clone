import './App.css';
import './scss/main.scss';
import Layout from './components/Layout';
import Home from './screens/Home';

import { useReducer } from 'react';
import { AudioContext } from './context/AudioContext.tsx';
import audioReducer from './context/AudioReducer.tsx';

function App() {
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
