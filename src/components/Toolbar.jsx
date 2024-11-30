import React from 'react';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaForward, FaBackward, FaCog } from 'react-icons/fa';
import '../styles/toolbar.css';

const Toolbar = ({ isPlaying, onPlayPause, onSeek, onSkip, theme, setSettingsVisible }) => {
  return (
    <div
      className="toolbar-container"
      style={{ backgroundColor: theme.colors.toolbarBg }}
    >
      <button onClick={onPlayPause} className="toolbar-button">
        {isPlaying ? theme.icons.pause || <FaPause /> : theme.icons.play || <FaPlay />}
      </button>
      <button onClick={() => onSeek(-10)} className="toolbar-button">
        <FaBackward />
      </button>
      <button onClick={() => onSeek(10)} className="toolbar-button">
        <FaForward />
      </button>
      <button
        onClick={() => setSettingsVisible(true)}
        className="toolbar-button"
      >
        {theme.icons.settings || <FaCog />}
      </button>
    </div>
  );
};

Toolbar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  setSettingsVisible: PropTypes.func.isRequired,
};

export default Toolbar;
