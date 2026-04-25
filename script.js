document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('interestForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const topic = document.getElementById('topic').value;
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Stride Dynamics Lab: ${topic}`);
  const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}

Sent from stridedynamicslab.com`
  );

  window.location.href = `mailto:matt@mwstrategicadvisors.com?subject=${subject}&body=${body}`;
});
