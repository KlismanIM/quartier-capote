/**
 * Swiper carousel module
 * Initializes and configures the image gallery carousel
 */

export function initSwiper() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper library not loaded');
    return null;
  }

  const swiperContainer = document.querySelector('.swiper');
  if (!swiperContainer) {
    console.warn('Swiper container not found');
    return null;
  }

  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
  });

  return swiper;
}

export default initSwiper;