const BUSINESS_EMAIL = "matt@mwstrategicadvisors.com"; // Change this to your preferred inbox before publishing.

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = thumb.dataset.src;
    mainImage.alt = thumb.dataset.alt;
  });
});

const dialog = document.getElementById("imageDialog");
const dialogImage = document.getElementById("dialogImage");
const mainImageButton = document.getElementById("mainImageButton");
const closeDialog = document.getElementById("closeDialog");

if (dialog && dialogImage && mainImageButton) {
  mainImageButton.addEventListener("click", () => {
    dialogImage.src = mainImage.src;
    dialogImage.alt = mainImage.alt;
    dialog.showModal();
  });
  closeDialog?.addEventListener("click", () => dialog.close());
}

const form = document.getElementById("interestForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const feedback = data.getAll("feedback").join(", ") || "None selected";
    const name = data.get("name") || "Not provided";
    const email = data.get("email") || "Not provided";
    const interest = data.get("interest") || "Not selected";
    const message = data.get("message") || "";

    const subject = encodeURIComponent("Stride Dynamics Foot Wedge Inquiry");
    const body = encodeURIComponent(
`Name: ${name}
Email: ${email}
Interest: ${interest}
Optional feedback: ${feedback}

Message:
${message}

Sent from stridedynamicslab.com`
    );
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  });
}
