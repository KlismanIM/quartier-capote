/**
 * Animations module
 * Handles scroll animations, touch device optimizations, and lazy loading
 */

export function initAnimations() {
  // Touch device detection and optimization
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    const cards = document.querySelectorAll('.luxury-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      
      card.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 300);
      });
    });
  }

  // Lazy loading optimization
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      if (img.dataset && img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  return {
    observer
  };
}

export default initAnimations;