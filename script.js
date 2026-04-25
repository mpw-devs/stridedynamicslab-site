
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const body = "Message from Stride Dynamics Lab site";
  window.location.href = "mailto:matt@mwstrategicadvisors.com?subject=Inquiry&body=" + body;
});
