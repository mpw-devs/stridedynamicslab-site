const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

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
