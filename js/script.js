// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

// --- Carousel JavaScript ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicatorsContainer = document.getElementById('carousel-indicators');
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  updateIndicators(index);
  currentSlide = index;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function createIndicators() {
  indicatorsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    indicator.addEventListener('click', () => showSlide(i));
    indicatorsContainer.appendChild(indicator);
  }
  updateIndicators(0);
}

function updateIndicators(index) {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, i) => {
    indicator.classList.remove('active');
    if (i === index) {
      indicator.classList.add('active');
    }
  });
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 8000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Event Listeners for Navigation Buttons
document.querySelector('.carousel-nav-button.prev').addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

document.querySelector('.carousel-nav-button.next').addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
  createIndicators();
  showSlide(0);
  startAutoSlide();
});

// Pause auto-slide on hover
document.getElementById('hero-carousel').addEventListener('mouseenter', stopAutoSlide);
document.getElementById('hero-carousel').addEventListener('mouseleave', startAutoSlide);

// --- Navbar Hide on Scroll JavaScript ---
let lastScrollTop = 0;
const mainHeader = document.getElementById('main-header');
let headerHeight = mainHeader.offsetHeight;

window.addEventListener('resize', () => {
  headerHeight = mainHeader.offsetHeight;
});

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
    mainHeader.classList.add('hidden-nav');
  } else {
    mainHeader.classList.remove('hidden-nav');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// --- Back to Top Button JavaScript ---
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --- Gallery Modal Functionality ---
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalCloseBtn = document.getElementById('modalCloseBtn');

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    try {
      const imgSrc = this.getAttribute('data-full');
      const imgAlt = this.querySelector('img').getAttribute('alt');
      if (imgSrc) {
        openModal(imgSrc, imgAlt);
      }
    } catch(error) {
      console.error('Error opening gallery modal:', error);
    }
  });
});

function openModal(imgSrc, imgAlt) {
  try {
    modalImage.src = imgSrc;
    modalImage.alt = imgAlt || 'Enlarged gallery image';
    galleryModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('Error opening modal:', error);
  }
}

function closeModal() {
  try {
    galleryModal.classList.add('hidden');
    document.body.style.overflow = '';
    modalImage.src = '';
  } catch (error) {
    console.error('Error closing modal:', error);
  }
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (galleryModal) {
  galleryModal.addEventListener('click', function(e) {
    if (e.target === galleryModal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !galleryModal.classList.contains('hidden')) {
    closeModal();
  }
});
