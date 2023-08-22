const AudioReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        title: 'Loading...',
        artist: action.payload.artist,
        image: action.payload.image,
        loading: true,
        playing: false,
      };
    case 'GET_TRACK':
      return {
        ...state,
        title: action.payload.title,
        artist: action.payload.artist,
        audio: action.payload.audio,
        image: action.payload.image,
        loading: false,
        playing: true,
      };
    case 'TOGGLE_PLAY':
      return {
        ...state,
        loading: false,
        playing: action.payload.playing,
      };

    default:
      return state;
  }
};

export default AudioReducer;
