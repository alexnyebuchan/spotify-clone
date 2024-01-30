import axios from 'axios';

export default () => {
  const options = {};
  options.baseURL = 'https://accounts.spotify.com/api';
  const instance = axios.create(options);
  return instance;
};