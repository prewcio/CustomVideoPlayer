import './styles.css';
import { formatTime, createThumbnail } from './utils';

class CustomVideoPlayer {
  constructor(videoElement, options = {}) {
    this.video = videoElement;
    this.options = options;
    this.container = document.createElement('div');
    this.container.className = 'custom-video-container';

    this.video.parentNode.insertBefore(this.container, this.video);
    this.container.appendChild(this.video);

    this.video.controls = false; // Disable default controls

    this.createUI();
    this.addEventListeners();
  }

  createUI() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'custom-toolbar';

    // Play/Pause Button
    this.playPauseButton = document.createElement('button');
    this.playPauseButton.className = 'play-pause';
    this.playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
    this.toolbar.appendChild(this.playPauseButton);

    // Forward Button
    this.forwardButton = document.createElement('button');
    this.forwardButton.className = 'forward';
    this.forwardButton.innerHTML = '<i class="fa fa-forward"></i>';
    this.toolbar.appendChild(this.forwardButton);

    // Backward Button
    this.backwardButton = document.createElement('button');
    this.backwardButton.className = 'backward';
    this.backwardButton.innerHTML = '<i class="fa fa-backward"></i>';
    this.toolbar.appendChild(this.backwardButton);

    // Skip Button
    this.skipButton = document.createElement('button');
    this.skipButton.className = 'skip';
    this.skipButton.innerHTML = '<i class="fa fa-step-forward"></i>';
    this.toolbar.appendChild(this.skipButton);

    // Progress Bar
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progress-bar';
    this.progressBar.innerHTML = `
      <div class="progress">
        <div class="buffered"></div>
        <div class="current"></div>
      </div>
      <div class="sections"></div>
    `;
    this.toolbar.appendChild(this.progressBar);

    // Timestamp & Thumbnails
    this.timestamp = document.createElement('div');
    this.timestamp.className = 'timestamp';
    this.toolbar.appendChild(this.timestamp);

    // Settings Button
    this.settingsButton = document.createElement('button');
    this.settingsButton.className = 'settings';
    this.settingsButton.innerHTML = '<i class="fa fa-cog"></i>';
    this.toolbar.appendChild(this.settingsButton);

    this.container.appendChild(this.toolbar);
  }

  addEventListeners() {
    this.playPauseButton.addEventListener('click', () => {
      if (this.video.paused) {
        this.video.play();
        this.playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
      } else {
        this.video.pause();
        this.playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
      }
    });

    this.forwardButton.addEventListener('click', () => {
      this.video.currentTime += 10;
    });

    this.backwardButton.addEventListener('click', () => {
      this.video.currentTime -= 10;
    });

    this.skipButton.addEventListener('click', () => {
      const nextSection = this.options.sections.find(
        (section) => section.start > this.video.currentTime
      );
      if (nextSection) this.video.currentTime = nextSection.start;
    });

    this.video.addEventListener('timeupdate', () => {
      const currentPercentage =
        (this.video.currentTime / this.video.duration) * 100;
      this.container.querySelector('.current').style.width = `${currentPercentage}%`;
      this.timestamp.innerHTML = formatTime(this.video.currentTime);
    });

    this.progressBar.addEventListener('mousemove', (e) => {
      const rect = this.progressBar.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
      const time = (this.video.duration * percentage) / 100;
      createThumbnail(this.video, time, this.timestamp);
    });
  }
}

export default CustomVideoPlayer;
