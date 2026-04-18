/**
 * Scroll module
 * Handles smooth scrolling for anchor links
 */

export function initScroll() {
  function smoothScroll(targetId, offset = 80) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  function handleAnchorClick(e) {
    const anchor = e.currentTarget;
    const href = anchor.getAttribute('href');
    
    if (href && href.startsWith('#') && href !== '#') {
      e.preventDefault();
      smoothScroll(href);
    }
  }

  // Initialize all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });

  return {
    smoothScroll
  };
}

export default initScroll;