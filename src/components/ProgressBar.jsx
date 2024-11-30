import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/progressBar.css';
import formatTime from '../utils/formatTime';
import generateThumbnail from '../utils/generateThumbnail';

const ProgressBar = ({ currentTime, duration, sections, onSeek, theme, videoRef }) => {
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverThumbnail, setHoverThumbnail] = useState(null);

  const handleMouseMove = async (event) => {
    const rect = event.target.getBoundingClientRect();
    const hoverPosition = (event.clientX - rect.left) / rect.width;
    const hoverTime = hoverPosition * duration;

    setHoverTime(hoverTime);

    if (videoRef.current) {
      const thumbnail = await generateThumbnail(videoRef.current, hoverTime);
      setHoverThumbnail(thumbnail);
    }
  };

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    onSeek(clickPosition * duration);
  };

  return (
    <div
      className="progress-bar-container"
      style={{ backgroundColor: theme.colors.progressBg }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHoverTime(null);
        setHoverThumbnail(null);
      }}
      onClick={handleClick}
    >
      <div
        className="progress-bar"
        style={{
          width: `${(currentTime / duration) * 100}%`,
          backgroundColor: theme.colors.toolbarBg,
        }}
      />
      {sections.map((section, index) => (
        <div
          key={index}
          className="progress-section"
          style={{
            left: `${(section.start / duration) * 100}%`,
            width: `${((section.end - section.start) / duration) * 100}%`,
            backgroundColor: section.color,
          }}
        >
          {section.labelOn && (
            <span className="section-label" style={{ color: theme.colors.sectionText }}>
              {section.label}
            </span>
          )}
        </div>
      ))}
      {hoverTime !== null && (
        <div className="hover-preview" style={{ left: `${(hoverTime / duration) * 100}%` }}>
          <span className="hover-time">{formatTime(hoverTime)}</span>
          {hoverThumbnail && (
            <img src={hoverThumbnail} alt="Preview" className="hover-thumbnail" />
          )}
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      label: PropTypes.string,
      color: PropTypes.string,
      labelOn: PropTypes.bool,
    })
  ),
  onSeek: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default ProgressBar;
