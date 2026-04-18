/**
 * Mobile menu module
 * Handles mobile navigation toggle and active section detection
 */

export function initMenu() {
  let isMenuOpen = false;
  let activeSection = 'hero';
  let scrollPosition = 0;
  let isMobile = window.innerWidth < 768;

  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  function updateActiveSection() {
    const sections = ['hero', 'video', 'gallery', 'specs', 'contact'];
    for (let section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeSection = section;
          updateNavActiveStates();
        }
      }
    }
  }

  function updateNavActiveStates() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.substring(1) === activeSection) {
        link.classList.add('nav-link-active');
        link.classList.remove('nav-link-inactive');
      } else {
        link.classList.add('nav-link-inactive');
        link.classList.remove('nav-link-active');
      }
    });
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      if (isMenuOpen) {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.style.display = 'none';
    }
  }

  function handleScroll() {
    scrollPosition = window.scrollY;
    updateActiveSection();
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (scrollPosition > 100) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  }

  // Event listeners
  window.addEventListener('resize', checkMobile);
  window.addEventListener('scroll', handleScroll);
  
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }

  // Close menu on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Initial call
  checkMobile();
  updateActiveSection();

  return {
    toggleMenu,
    closeMenu,
    isMenuOpen: () => isMenuOpen,
    activeSection: () => activeSection
  };
}

export default initMenu;