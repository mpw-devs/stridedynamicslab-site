document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('interestForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const interestType = data.get('interestType') || 'General question';
    const message = data.get('message') || '';

    const subject = `Stride Dynamics Lab inquiry: ${interestType}`;
    const body = [
      'Stride Dynamics Lab Foot Wedge inquiry',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest type: ${interestType}`,
      '',
      'Message:',
      message
    ].join('\n');

    const mailto = `mailto:matt@mwstrategicadvisors.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
});
