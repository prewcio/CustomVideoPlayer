import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import ProgressBar from './ProgressBar';
import SettingsMenu from './SettingsMenu';
import defaultTheme from '../styles/defaultTheme';
import '../styles/customVidPlayer.css';

const CustomVidPlayer = ({ videoSrc, sections = [], theme = defaultTheme }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => setCurrentTime(video.currentTime);
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', () => setDuration(video.duration));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seek = (time) => {
    const video = videoRef.current;
    video.currentTime = Math.min(Math.max(video.currentTime + time, 0), duration);
  };

  const skipTo = (time) => {
    const video = videoRef.current;
    video.currentTime = Math.min(time, duration);
  };

  const handleKeyPress = (event) => {
    switch (event.key) {
      case 'f':
        videoRef.current.requestFullscreen();
        break;
      case ' ':
      case 'k':
        togglePlay();
        break;
      case 'l':
      case 'ArrowRight':
        seek(10);
        break;
      case 'j':
      case 'ArrowLeft':
        seek(-10);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, isPlaying]);

  return (
    <div className="custom-vid-player" style={{ fontFamily: theme.font }}>
      <video ref={videoRef} src={videoSrc} style={{ width: '100%' }} />
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        sections={sections}
        onSeek={skipTo}
        theme={theme}
        videoRef={videoRef}
      />
      <Toolbar
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        onSeek={seek}
        onSkip={skipTo}
        theme={theme}
        setSettingsVisible={setSettingsVisible}
      />
      {settingsVisible && (
        <SettingsMenu theme={theme} setSettingsVisible={setSettingsVisible} />
      )}
    </div>
  );
};

CustomVidPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      label: PropTypes.string,
      color: PropTypes.string,
      labelOn: PropTypes.bool,
    })
  ),
  theme: PropTypes.object,
};

export default CustomVidPlayer;
