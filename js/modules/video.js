/**
 * Video player module
 * Handles custom video controls and prevents download
 */

export function initVideo() {
  const video = document.getElementById('mainVideo');
  const playOverlay = document.getElementById('playOverlay');
  const playButton = document.getElementById('playButton');

  if (!video) return null;

  // Disable download
  video.controlsList = 'nodownload';
  
  // Prevent right-click context menu
  video.addEventListener('contextmenu', (e) => e.preventDefault());

  function playVideo() {
    video.play();
    if (playOverlay) {
      playOverlay.style.opacity = '0';
      setTimeout(() => {
        if (playOverlay) playOverlay.style.display = 'none';
      }, 300);
    }
  }

  function showPlayOverlay() {
    if (playOverlay) {
      playOverlay.style.display = 'flex';
      playOverlay.style.opacity = '1';
    }
  }

  if (playButton) {
    playButton.addEventListener('click', playVideo);
  }

  video.addEventListener('play', () => {
    if (playOverlay) {
      playOverlay.style.opacity = '0';
      setTimeout(() => {
        if (playOverlay) playOverlay.style.display = 'none';
      }, 300);
    }
  });

  video.addEventListener('ended', showPlayOverlay);

  return {
    playVideo,
    showPlayOverlay
  };
}

export default initVideo;