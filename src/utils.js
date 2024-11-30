export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  export function createThumbnail(video, time, container) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 160;
    canvas.height = 90;
    video.currentTime = time;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    container.innerHTML = '';
    container.appendChild(canvas);
  }
  