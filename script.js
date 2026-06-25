const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.product-carousel').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prev = carousel.querySelector('.carousel-btn.prev');
  const next = carousel.querySelector('.carousel-btn.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  if (!track || !slides.length || !prev || !next || !dotsContainer) return;

  let current = 0;

  if (slides.length <= 1) {
    carousel.classList.add('single-slide');
  }

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show image ${index + 1}`);
    if (index === 0) dot.classList.add('active');

    dot.addEventListener('click', (event) => {
      event.stopPropagation();
      showSlide(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = carousel.querySelectorAll('.carousel-dot');

  function showSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  function openLightbox() {
    const activeSlide = slides[current];
    openImageLightbox(activeSlide.src, activeSlide.alt);
  }

  track.addEventListener('click', openLightbox);

  track.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
    }
  });

  prev.addEventListener('click', (event) => {
    event.stopPropagation();
    prevSlide();
  });

  next.addEventListener('click', (event) => {
    event.stopPropagation();
    nextSlide();
  });
});

function openImageLightbox(src, alt) {
  let lightbox = document.querySelector('.image-lightbox');

  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close image">×</button>
      <img class="lightbox-image" src="" alt="">
    `;
    document.body.appendChild(lightbox);
  }

  const image = lightbox.querySelector('.lightbox-image');
  const close = lightbox.querySelector('.lightbox-close');

  image.src = src;
  image.alt = alt || 'Expanded product image';

  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    document.onkeydown = null;
  }

  close.onclick = closeLightbox;

  lightbox.onclick = (event) => {
    if (event.target === lightbox) closeLightbox();
  };

  document.onkeydown = (event) => {
    if (event.key === 'Escape') closeLightbox();
  };
}

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = new FormData(form);
    const subject = encodeURIComponent(`Stride Dynamics Lab inquiry: ${data.get('reason') || 'Website inquiry'}`);
    const body = encodeURIComponent(
`Name: ${data.get('name') || ''}
Email: ${data.get('email') || ''}
Reason: ${data.get('reason') || ''}

Message:
${data.get('message') || ''}`
    );

    window.location.href = `mailto:info@stridedynamicslab.com?subject=${subject}&body=${body}`;
  });
}