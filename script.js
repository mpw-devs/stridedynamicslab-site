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
