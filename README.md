# Stride Dynamics website — contact fix v18

This changes **only the contact functionality** in the existing v17 Dynamic Foot Wedge site. The hero, logo, audience cards, product/gallery, Etsy button, and contact layout remain otherwise unchanged.

## Why the existing Contact form appeared broken

The prior form used `mailto:`, which does **not** submit directly from the website. It depends on the visitor having a default email application configured. Clicking an email link or **Prepare email** can appear to do nothing on browsers and devices without such an application.

The top navigation `#contact` anchor and the product's **Ask about availability** anchor already point to the correct section. These anchors have not changed.

## New contact flow

- The form now submits with a standard HTTPS POST to [FormSubmit](https://formsubmit.co/), a third-party form-to-email service. It works without a visitor's local email application or JavaScript.
- Visitor fields (name, email, reason, message) are sent to FormSubmit for processing. A privacy link is visible below the form.
- The direct email `mailto:` link is retained for people with email apps; a **Copy address** button provides an alternative.
- The **Ask about availability** link still sets "Interested in purchasing" and drafts a prefilled inquiry in the form.
- The form keeps CAPTCHA and adds a hidden honeypot to reduce spam. No service keys are embedded in the website.

## REQUIRED: Activate the form before relying on it

The configured endpoint is:

`https://formsubmit.co/info@stridedynamicslab.com`

**Before merging:** Confirm that `info@stridedynamicslab.com` is an active inbox you control. If it is not, change both this endpoint and the displayed recipient address to an inbox you control. The form cannot be activated without receiving email at its configured address.

**After merging / deploying:**

1. Visit the **live** `https://stridedynamicslab.com/` site.
2. Submit a test inquiry through the Contact form. On first use, FormSubmit emails an **activation link** to the configured recipient.
3. Open that inbox (including its spam folder) and **click the FormSubmit activation link**. Form messages cannot be counted as delivered until activation is complete.
4. Submit a second test inquiry on a phone or another browser and verify it actually arrives in the inbox. Only then count this setup as working end-to-end.
5. If activation mail never arrives, verify the inbox is receiving normal mail, and see [FormSubmit setup](https://formsubmit.co/help).

The form will open FormSubmit's default CAPTCHA/thank-you flow rather than navigating to an onsite confirmation. This is intentional for a simple and reliable native HTML POST.

**Please note:** Using FormSubmit means visitor form content is processed by an external provider. Review its [privacy terms](https://formsubmit.co/privacy.pdf) before merging if you have specific privacy requirements. If you prefer a provider you already use, we can switch to its verified endpoint instead.

## Files changed

- `index.html`: form action + hidden fields, updated submit text, email copy button and privacy notice.
- `script.js`: removes `mailto:` submission interception; adds safe Copy address behavior.
- `styles.css`: styles the copy button, status message, and hidden anti-spam field.
- `README.md`: documents the activation and testing steps.

No product photographs, logos, favicons, or other assets are modified.