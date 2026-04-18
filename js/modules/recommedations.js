/**
 * Floating recommendations module
 * Displays similar properties with cooldown functionality
 */

export function initRecommendations() {
  let visible = false;
  let expanded = false;
  let isMobile = window.innerWidth < 768;
  let observer = null;
  const lastClosedKey = 'recoPanelClosed';
  const COOLDOWN_MS = 50000; // 50 seconds

  function isInCooldown() {
    const lastClosed = localStorage.getItem(lastClosedKey);
    if (!lastClosed) return false;
    const diff = Date.now() - parseInt(lastClosed, 10);
    return diff < COOLDOWN_MS;
  }

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  function updateUI() {
    const panel = document.getElementById('recommendationsPanel');
    const minimized = document.getElementById('recommendationsMinimized');
    
    if (!visible) {
      if (panel) panel.style.display = 'none';
      if (minimized) minimized.style.display = 'none';
      return;
    }
    
    if (expanded) {
      if (panel) panel.style.display = 'block';
      if (minimized) minimized.style.display = 'none';
    } else {
      if (panel) panel.style.display = 'none';
      if (minimized) minimized.style.display = 'block';
    }
  }

  function showPanel() {
    if (isInCooldown()) return;
    visible = true;
    updateUI();
  }

  function expandPanel() {
    if (!visible) return;
    expanded = true;
    updateUI();
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 30);
    }
  }

  function collapsePanel() {
    expanded = false;
    updateUI();
  }

  function closePanel() {
    localStorage.setItem(lastClosedKey, Date.now().toString());
    visible = false;
    expanded = false;
    updateUI();
  }

  function initScrollTrigger() {
    const handleScroll = () => {
      if (visible || isInCooldown()) return;
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = window.scrollY / docHeight;
      if (scrollPercent > 0.4) {
        showPanel();
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
  }

  function initIntersectionObserver() {
    const target = document.getElementById('similares-original');
    if (target) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !visible && !isInCooldown()) {
            showPanel();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(target);
    }
  }

  // Initialize event listeners
  window.addEventListener('resize', () => {
    checkMobile();
    updateUI();
  });

  // Check cooldown and initialize
  if (!isInCooldown()) {
    initScrollTrigger();
    initIntersectionObserver();
  }

  // Return public API
  return {
    showPanel,
    expandPanel,
    collapsePanel,
    closePanel,
    isVisible: () => visible,
    isExpanded: () => expanded
  };
}

export default initRecommendations;