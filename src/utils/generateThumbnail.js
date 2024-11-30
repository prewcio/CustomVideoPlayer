const generateThumbnail = (video, time) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth / 4;
      canvas.height = video.videoHeight / 4;
  
      const context = canvas.getContext('2d');
      video.currentTime = time;
  
      video.addEventListener(
        'seeked',
        () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL());
        },
        { once: true }
      );
    });
  };
  
  export default generateThumbnail;
  