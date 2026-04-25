const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');
thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const src = thumb.getAttribute('data-src');
    const alt = thumb.getAttribute('data-alt') || 'Foot Wedge Trainer product image';
    if (mainImage && src) {
      mainImage.src = src;
      mainImage.alt = alt;
    }
    thumbs.forEach((t) => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

const form = document.getElementById('interestForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const body = [
      'Stride Dynamics Lab website inquiry',
      '',
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Reason: ${data.get('interest') || ''}`,
      '',
      'Message:',
      data.get('message') || ''
    ].join('\n');
    const mailto = `mailto:matt@mwstrategicadvisors.com?subject=${encodeURIComponent('Stride Dynamics Lab Foot Wedge Inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
