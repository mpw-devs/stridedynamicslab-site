const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
const mainImageButton = document.getElementById('mainImageButton');
const dialog = document.getElementById('imageDialog');
const dialogImage = document.getElementById('dialogImage');
const closeDialog = document.getElementById('closeDialog');
const form = document.getElementById('interestForm');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.src = thumb.dataset.src;
    mainImage.alt = thumb.dataset.alt;
  });
});

mainImageButton.addEventListener('click', () => {
  dialogImage.src = mainImage.src;
  dialogImage.alt = mainImage.alt;
  dialog.showModal();
});

closeDialog.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const feedback = data.getAll('feedback');
  const subject = encodeURIComponent('Stride Dynamics Foot Wedge Inquiry');
  const body = encodeURIComponent(
`Name: ${data.get('name') || ''}
Email: ${data.get('email') || ''}
Interest: ${data.get('interest') || ''}
Optional feedback: ${feedback.join(', ') || 'None selected'}

Message:
${data.get('message') || ''}`
  );
  window.location.href = `mailto:matt@mwstrategicadvisors.com?subject=${subject}&body=${body}`;
});
