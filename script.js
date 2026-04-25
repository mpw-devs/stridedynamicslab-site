
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const reason = data.get('reason') || '';
    const message = data.get('message') || '';

    const subject = encodeURIComponent(`Stride Dynamics Lab inquiry: ${reason}`);
    const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Reason: ${reason}

Message:
${message}`
    );

    window.location.href = `mailto:info@stridedynamicslab.com?subject=${subject}&body=${body}`;
  });
}
