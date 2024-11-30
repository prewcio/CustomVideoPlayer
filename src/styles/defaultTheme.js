import { FaPlay, FaPause, FaCog } from 'react-icons/fa';

const defaultTheme = {
  colors: {
    toolbarBg: '#333',
    progressBg: '#555',
    sectionBg: '#888',
    sectionText: '#fff',
  },
  icons: {
    play: <FaPlay />,
    pause: <FaPause />,
    settings: <FaCog />,
  },
};

export default defaultTheme;
