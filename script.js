document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('interestForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const reason = document.getElementById('reason').value;
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent('Stride Dynamics Lab Foot Wedge Inquiry');
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:matt@mwstrategicadvisors.com?subject=${subject}&body=${body}`;
});
