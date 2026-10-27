# Stride Dynamics — Website refresh v17 (review version)

This is a focused, single-product website for the **Dynamic Foot Wedge**. It updates the open GitHub pull request, **not the live website** until the pull request is merged.

## What changed from v16

- Kept the larger Stride Dynamics logo (78px desktop / 62px mobile).
- Replaced the strength-focused hero with a centered, full-width message: **Feel better on your feet.** No AI lifestyle photo is used in the hero.
- Kept a single hero CTA linking down to the featured product.
- Added three audience cards: **Athletes**, **PT & recovery**, and **Tight arches / plantar fascia**. All three are visible side-by-side on desktop; on mobile/tablet they form a horizontally scrollable, swipeable row with arrow buttons and a position indicator.
- Consolidated product information into one **Dynamic Foot Wedge** section. Removed the Static Foot Wedge and the separate “Why it matters” section; their relevant mobility, arch-contact, and everyday-movement ideas are integrated into the persona/product sections.
- Kept the existing feedback/contact section, with the same email address and mailto behavior.
- Preserved the existing Dynamic Foot Wedge photo gallery, mobile swiping, desktop hover arrows, and tap/click-to-enlarge viewer.
- Kept the Etsy listing and a separate availability inquiry CTA.

## Deployment

Upload `index.html`, `styles.css`, and `script.js` to the repository root (or merge the proposed GitHub pull request). Retain your **existing assets and favicon files**; this revision does not change or rename them. When manually deploying, hard-refresh to clear browser caches.

## Images and logo

Logo: `assets/SDL_Logo_Header.png` — intentionally remains 78px on desktop and 62px on mobile.

Gallery photo files already in the repository:

- `assets/DSC03273.jpg`
- `assets/DSC03274.jpg`
- `assets/DSC03276.jpg`
- `assets/DSC03302.jpg`
- `assets/DSC03303.jpg`

If you later add `assets/Dynamic_Wedge-Demo.gif`, uncomment the optional GIF image line in `index.html` to include it in the carousel. No extra JS changes are needed.

## Interactions

- Desktop product gallery: hover for arrows and zoom icon; click photo to open full-size viewer.
- Mobile product gallery: swipe photo to change slides, tap to enlarge; tap small image dots to jump; swipe enlarged image to navigate.
- Audience cards: all three visible on wide screens; swipe horizontally on narrow screens or use the audience arrows. Keyboard focus on the card rail supports left/right arrows.
- Contact: the contact form **does not submit to a server**. “Prepare email” opens the visitor's configured mail application with the message filled out; nothing is sent automatically. The direct email link works as another option.
- Pricing and inventory: the site does not claim pricing or stock. Check the Etsy listing for current availability.

## Review checklist

1. Does the headline communicate comfort and mobility rather than strength training?
2. Do the three audience cards represent athletes, PT/recovery, and plantar/arch tightness in language that fits each audience?
3. Does the single Dynamic Foot Wedge product section explain the textured wedge and rolling barrel clearly?
4. Are the mobile card swiping and photo gallery interactions intuitive?
5. Are the preserved feedback/contact section and original logo still to your liking?

## Validation and claim boundaries

The website uses language around comfort, stretching, mobility and product mechanics rather than claiming to diagnose, cure or treat plantar fasciitis or other conditions. Use the product according to individual tolerance and any clinician's guidance.