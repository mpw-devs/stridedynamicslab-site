# Stride Dynamics website — direct Gmail FormSubmit routing (v18.1)

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

The configured form endpoint is:

`https://formsubmit.co/mpweber@gmail.com`

The public-facing contact address displayed on the website remains **`info@stridedynamicslab.com`**, and Cloudflare Email Routing can continue forwarding ordinary messages sent to that address. Form submissions are instead sent to Gmail directly. A dedicated hosted mailbox at the custom domain is **not** required for Cloudflare forwarding to work.

**Before merging:** Confirm that `mpweber@gmail.com` is the intended destination and that you are comfortable with this address being visible to people or bots that inspect the HTML source. If you need to hide it later, FormSubmit offers an "invisible email" token after activation.

**After merging / deploying:**

1. Visit the **live** `https://stridedynamicslab.com/` site.
2. Submit a test inquiry through the Contact form. On first use with the **new destination**, FormSubmit emails an **activation link** directly to `mpweber@gmail.com` (changing the form email address requires reactivation).
3. Open that inbox (including its spam folder) and **click the FormSubmit activation link**. Form messages cannot be counted as delivered until activation is complete.
4. Submit a second test inquiry on a phone or another browser and verify it actually arrives in the inbox. Only then count this setup as working end-to-end.
5. If activation mail never arrives, check all Gmail folders (including Spam), and see [FormSubmit setup](https://formsubmit.co/help).

The form will open FormSubmit's default CAPTCHA/thank-you flow rather than navigating to an onsite confirmation. This is intentional for a simple and reliable native HTML POST.

**Please note:** Using FormSubmit means visitor form content is processed by an external provider. Review its [privacy terms](https://formsubmit.co/privacy.pdf) before merging if you have specific privacy requirements. If you prefer a provider you already use, we can switch to its verified endpoint instead.

## Files changed in this follow-up

- `index.html`: changes only the FormSubmit form action to the direct Gmail destination; preserves public-facing contact details.
- `README.md`: documents the revised routing, privacy tradeoff, and required reactivation.

The `script.js`, `styles.css`, and original v18 visual design remain unchanged.

No product photographs, logos, favicons, or other assets are modified.