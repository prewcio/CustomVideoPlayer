import React from 'react';
import PropTypes from 'prop-types';
import '../styles/settingsMenu.css';

const SettingsMenu = ({ theme, setSettingsVisible }) => {
  const handleClose = () => {
    setSettingsVisible(false);
  };

  return (
    <div className="settings-menu" style={{ backgroundColor: theme.colors.toolbarBg }}>
      <h3>Settings</h3>
      <button onClick={handleClose}>Close</button>
      <div>
        <h4>Resolution</h4>
        <ul>
          <li>1080p</li>
          <li>720p</li>
          <li>480p</li>
        </ul>
      </div>
      <div>
        <h4>Theme</h4>
        <p>Choose custom themes here!</p>
      </div>
    </div>
  );
};

SettingsMenu.propTypes = {
  theme: PropTypes.object.isRequired,
  setSettingsVisible: PropTypes.func.isRequired,
};

export default SettingsMenu;
