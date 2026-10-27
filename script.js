/* Stride Dynamics v18 — audience scroll, gallery, and reliable contact options */
(() => {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const dialog = document.getElementById('image-lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const dialogProduct = document.getElementById('lightbox-product');
  const dialogCaption = document.getElementById('lightbox-caption');
  const dialogCount = document.getElementById('lightbox-count');
  let expandedGallery = null;
  let previousFocus = null;

  const formattedCount = (current, total) =>
    `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  function updateDialog() {
    if (!expandedGallery || !dialog) return;
    const image = expandedGallery.activeImage();
    if (!image) return;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogProduct.textContent = expandedGallery.title;
    dialogCaption.textContent = image.alt;
    dialogCount.textContent = formattedCount(expandedGallery.index(), expandedGallery.length());
    dialog.classList.toggle('is-single', expandedGallery.length() < 2);
  }

  function openDialog(gallery) {
    if (!dialog || typeof dialog.showModal !== 'function') {
      // Very old browsers: open the selected image directly instead.
      const image = gallery.activeImage();
      if (image) window.open(image.currentSrc || image.src, '_blank', 'noopener');
      return;
    }
    previousFocus = document.activeElement;
    expandedGallery = gallery;
    updateDialog();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('lightbox-open');
    dialog.querySelector('[data-lightbox-close]').focus();
  }

  if (dialog) {
    dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => {
      if (expandedGallery) { expandedGallery.step(-1); updateDialog(); }
    });
    dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => {
      if (expandedGallery) { expandedGallery.step(1); updateDialog(); }
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      expandedGallery = null;
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    });
    document.addEventListener('keydown', event => {
      if (!dialog.open || !expandedGallery) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); expandedGallery.step(1); updateDialog(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); expandedGallery.step(-1); updateDialog(); }
      // Escape is handled natively by <dialog>.
    });

    // Swiping also works when an image is expanded on a phone.
    let start = null;
    dialogImage.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') start = { x: event.clientX, y: event.clientY };
    });
    dialogImage.addEventListener('pointerup', event => {
      if (!start || !expandedGallery) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        expandedGallery.step(dx < 0 ? 1 : -1);
        updateDialog();
      }
    });
    dialogImage.addEventListener('pointercancel', () => { start = null; });
  }

  document.querySelectorAll('[data-gallery]').forEach(galleryElement => {
    let slides = [...galleryElement.querySelectorAll('[data-slide]')];
    const expand = galleryElement.querySelector('[data-zoom]');
    const prev = galleryElement.querySelector('[data-prev]');
    const next = galleryElement.querySelector('[data-next]');
    const dots = galleryElement.querySelector('[data-dots]');
    const counter = galleryElement.querySelector('[data-count]');
    let current = 0;

    const galleryAPI = {
      title: galleryElement.dataset.galleryTitle || 'Product image',
      activeImage: () => slides[current],
      index: () => current,
      length: () => slides.length,
      step: delta => show(current + delta)
    };

    function show(index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      slides.forEach((img, i) => {
        const active = i === current;
        img.classList.toggle('is-active', active);
        img.setAttribute('aria-hidden', String(!active));
      });
      [...dots.children].forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
      if (counter) counter.textContent = formattedCount(current, slides.length);
      galleryElement.classList.toggle('is-single', slides.length <= 1);
      if (dialog && dialog.open && expandedGallery === galleryAPI) updateDialog();
    }

    function buildDots() {
      dots.replaceChildren();
      slides.forEach((img, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-dot';
        button.setAttribute('aria-label', `Show image ${i + 1} of ${slides.length}: ${img.alt}`);
        button.addEventListener('click', event => { event.stopPropagation(); show(i); });
        dots.appendChild(button);
      });
      show(Math.min(current, Math.max(0, slides.length - 1)));
    }

    // Keep an optional GIF or extra photo from displaying as a broken slide
    // if it is not yet present in the assets folder.
    slides.forEach(img => {
      const removeMissingImage = () => {
        const position = slides.indexOf(img);
        if (position < 0) return;
        slides.splice(position, 1);
        img.remove();
        if (current >= position && current > 0) current--;
        buildDots();
      };
      img.addEventListener('error', removeMissingImage, { once: true });
      if (img.complete && img.naturalWidth === 0) removeMissingImage();
    });

    if (prev) prev.addEventListener('click', event => { event.stopPropagation(); show(current - 1); });
    if (next) next.addEventListener('click', event => { event.stopPropagation(); show(current + 1); });

    // On touchscreens, horizontal swipe changes slide; a tap opens full size.
    // Ignore the synthetic click generated after a swipe.
    let touchStart = null;
    let ignoreNextClick = false;
    if (expand) {
      expand.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch' || event.pointerType === 'pen') {
          touchStart = { x: event.clientX, y: event.clientY };
        }
      });
      expand.addEventListener('pointerup', event => {
        if (!touchStart) return;
        const dx = event.clientX - touchStart.x;
        const dy = event.clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2 && slides.length > 1) {
          ignoreNextClick = true;
          show(current + (dx < 0 ? 1 : -1));
        }
      });
      expand.addEventListener('pointercancel', () => { touchStart = null; });
      expand.addEventListener('click', event => {
        if (ignoreNextClick) { event.preventDefault(); ignoreNextClick = false; return; }
        openDialog(galleryAPI);
      });
      expand.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
      });
    }
    buildDots();
  });

  // Three persona cards: native horizontal scroll, with accessible arrow controls
  // and a small progress indicator at mobile/tablet sizes.
  const audienceTrack = document.getElementById('audience-track');
  if (audienceTrack) {
    const cards = [...audienceTrack.querySelectorAll('.audience-card')];
    const previous = document.querySelector('[data-audience-prev]');
    const next = document.querySelector('[data-audience-next]');
    const progress = [...document.querySelectorAll('.audience-position span')];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const cardLeft = index => cards[index].offsetLeft - cards[0].offsetLeft;
    const currentIndex = () => {
      const maxScroll = Math.max(0, audienceTrack.scrollWidth - audienceTrack.clientWidth);
      if (maxScroll === 0) return 0;
      return Math.round((audienceTrack.scrollLeft / maxScroll) * (cards.length - 1));
    };
    const updateAudienceControls = () => {
      const index = currentIndex();
      if (previous) previous.disabled = index === 0;
      if (next) next.disabled = index >= cards.length - 1;
      progress.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    };
    const goToCard = index => {
      const target = Math.max(0, Math.min(index, cards.length - 1));
      const maxScroll = Math.max(0, audienceTrack.scrollWidth - audienceTrack.clientWidth);
      audienceTrack.scrollTo({left: Math.min(cardLeft(target), maxScroll), behavior: prefersReducedMotion.matches ? 'instant' : 'smooth'});
    };
    if (previous) previous.addEventListener('click', () => goToCard(currentIndex() - 1));
    if (next) next.addEventListener('click', () => goToCard(currentIndex() + 1));
    audienceTrack.addEventListener('scroll', updateAudienceControls, { passive: true });
    audienceTrack.addEventListener('keydown', event => {
      if (event.target !== audienceTrack) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); goToCard(currentIndex() + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goToCard(currentIndex() - 1); }
    });
    window.addEventListener('resize', updateAudienceControls);
    updateAudienceControls();
  }

  // Product inquiry links populate the existing contact form.
  document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', () => {
      const reason = document.getElementById('contact-reason');
      const message = document.getElementById('contact-message');
      if (reason) reason.value = 'Interested in purchasing';
      if (message && !message.value.trim()) {
        message.value = `I'm interested in the ${link.dataset.interest}. Could you share availability and purchase details?`;
      }
    });
  });

  // The contact form uses a standard HTTPS POST to FormSubmit. Do not intercept
  // submit: native form submission works even if JavaScript is blocked or fails.
  // Visitors without an email app can use the form or copy the address below.
  const copyButton = document.querySelector('[data-copy-email]');
  const copyFeedback = document.getElementById('contact-copy-feedback');
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const address = copyButton.dataset.copyEmail;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(address);
          copied = true;
        }
      } catch (_) {
        // Clipboard permission can be denied; use the classic fallback below.
      }
      if (!copied) {
        const helper = document.createElement('textarea');
        helper.value = address;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
        helper.remove();
      }
      if (copyFeedback) {
        copyFeedback.textContent = copied
          ? 'Email address copied. Paste it into any email app.'
          : 'Select and copy the email address above to email us directly.';
      }
    });
  }
})();