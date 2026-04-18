/**
 * Main JavaScript Entry Point
 * Initializes all modules for the Quartier Capote landing page
 */

// Import modules
import initMenu from './modules/menu.js';
import initScroll from './modules/scroll.js';
import initSwiper from './modules/swiper.js';
import initForm from './modules/form.js';
import initVideo from './modules/video.js';
import initAnimations from './modules/animations.js';
import initRecommendations from './modules/recommendations.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  const menu = initMenu();
  const scroll = initScroll();
  const swiper = initSwiper();
  const form = initForm();
  const video = initVideo();
  const animations = initAnimations();
  const recommendations = initRecommendations();

  // Reinitialize Lucide icons after dynamic content changes
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Log initialization for debugging (remove in production)
  console.log('Quartier Capote - Initialized');
});

// Handle Alpine.js integration
if (typeof Alpine !== 'undefined') {
  document.addEventListener('alpine:initialized', () => {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 30);
  });
}