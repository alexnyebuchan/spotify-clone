import { useState, useEffect, useRef, useContext } from 'react';

import { AudioContext } from '../context/AudioContext';

import styles from '../scss/AudioControls.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faPause,
  faPlay,
  faForwardStep,
  faBackwardStep,
} from '@fortawesome/free-solid-svg-icons';

const AudioControls = () => {
  //State
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Context
  const { state, dispatch } = useContext(AudioContext);

  // Reference
  const audioPlayer = useRef(); //audio component
  const progressBar = useRef(); // progress bar
  const animationRef = useRef(); // animation

  useEffect(() => {
    if (state.playing) {
      audioPlayer.current.play();
    } else if (!state.playing && state.audio) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

    const currentAudio = audioPlayer.current;
    currentAudio.onloadeddata = () => {
      animationRef.current = requestAnimationFrame(whilePlaying);
      const seconds = Math.floor(
        !isNaN(audioPlayer.current.duration) ? audioPlayer.current.duration : 0
      );
      setDuration(seconds);
      progressBar.current.max = seconds;
    };
  }, [state]);

  const calculateTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const returnedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const minutes = Math.floor(secs / 60);
    const calculatedMinutes = minutes >= 60 ? minutes - 60 : minutes;
    const returnedMinutes =
      calculatedMinutes < 10 ? `0${calculatedMinutes}` : `${calculatedMinutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (returnedHours < 1) {
      return `${returnedMinutes}:${returnedSeconds}`;
    } else {
      return `${returnedHours}:${returnedMinutes}:${returnedSeconds}`;
    }
  };

  const togglePlayPause = () => {
    const prevValue = state.playing;
    dispatch({
      type: 'TOGGLE_PLAY',
      payload: {
        playing: !prevValue,
      },
    });
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className={styles.playItems}>
      <audio
        ref={audioPlayer}
        src={state.audio}
        preload="metadata"
        id="audioFile"
      />
      <div className={styles.controls}>
        <button className={styles.step}>
          <FontAwesomeIcon id="faIcon" target="_blank" icon={faBackwardStep} />
        </button>
        <button className={styles.playPause} onClick={togglePlayPause}>
          {state.playing ? (
            <FontAwesomeIcon id="faIcon" target="_blank" icon={faPause} />
          ) : (
            <FontAwesomeIcon
              className={styles.play}
              id="faIcon"
              target="_blank"
              icon={faPlay}
            />
          )}
        </button>
        <button className={styles.step}>
          <FontAwesomeIcon id="faIcon" target="_blank" icon={faForwardStep} />
        </button>
      </div>
      <div className={styles.bar}>
        <span className={styles.currentTime}>{calculateTime(currentTime)}</span>

        <span>
          <input
            className={styles.progressBar}
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </span>

        <span className={styles.duration}>
          {!isNaN(duration) && calculateTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default AudioControls;
