// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
});

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
  // Wedding date: June 15, 2025 at 10:00 AM
  const weddingDate = new Date('2025-06-15T10:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      // Wedding has passed
      document.getElementById('days') && (document.getElementById('days').textContent = '00');
      document.getElementById('hours') && (document.getElementById('hours').textContent = '00');
      document.getElementById('minutes') && (document.getElementById('minutes').textContent = '00');
      document.getElementById('seconds') && (document.getElementById('seconds').textContent = '00');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Update immediately
  updateCountdown();
  
  // Update every second
  setInterval(updateCountdown, 1000);
}

// Start countdown when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCountdown);
} else {
  initCountdown();
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// ============================================
// RSVP FORM HANDLING
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const rsvpForm = document.getElementById('rsvpForm');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.attendance) {
        alert('Please select your attendance status');
        return;
      }

      const submitBtn = this.querySelector('.submit-btn');
      if (!submitBtn) {
        console.error('Submit button not found');
        return;
      }

      const originalText = submitBtn.textContent;
      const originalColor = submitBtn.style.backgroundColor;

      // Show success message
      submitBtn.textContent = 'Thank you! Your RSVP has been received.';
      submitBtn.style.backgroundColor = '#6b5446';
      submitBtn.disabled = true;

      // Log the data
      console.log('RSVP Data:', data);

      // Reset after 3 seconds
      setTimeout(() => {
        rsvpForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = originalColor;
        submitBtn.disabled = false;
      }, 3000);
    });
  }
});

// ============================================
// GALLERY LIGHTBOX
// ============================================
let currentImageIndex = 0;
let allGalleryItems = [];

document.addEventListener('DOMContentLoaded', function() {
  allGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));

  allGalleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      currentImageIndex = index;
      const img = this.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });
});

function openLightbox(src, alt) {
  const lightboxHTML = `
    <div class="lightbox" id="lightboxModal">
      <div class="lightbox-wrapper">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <img src="${src}" alt="${alt}" class="lightbox-image" id="lightboxImage" />
        <div class="lightbox-nav">
          <button class="lightbox-prev" aria-label="Previous" id="lightboxPrev">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="lightbox-next" aria-label="Next" id="lightboxNext">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  function closeLightbox() {
    if (lightbox) {
      lightbox.style.animation = 'fadeOutLight 0.3s ease forwards';
      setTimeout(() => lightbox.remove(), 300);
    }
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
    const newImg = allGalleryItems[currentImageIndex].querySelector('img');
    if (newImg) {
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.src = newImg.src;
        lightboxImage.alt = newImg.alt;
        lightboxImage.style.opacity = '1';
      }, 200);
    }
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % allGalleryItems.length;
    const newImg = allGalleryItems[currentImageIndex].querySelector('img');
    if (newImg) {
      lightboxImage.style.opacity = '0';
      setTimeout(() => {
        lightboxImage.src = newImg.src;
        lightboxImage.alt = newImg.alt;
        lightboxImage.style.opacity = '1';
      }, 200);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightboxModal')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    }
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Add style for animate-in class
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Setup Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.couple-card, .timeline-item, .wish-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.pageYOffset > 100) {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
});

// ============================================
// ACCESSIBILITY - SKIP TO MAIN CONTENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const skipLink = document.createElement('a');
  skipLink.href = '#couple';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #8b7355;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  if (document.body.firstChild) {
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
});
