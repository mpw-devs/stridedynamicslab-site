# Stride Dynamics — Website refresh v16

This is a full replacement for the website's `index.html`, `styles.css`, and `script.js`.

## Deploy

1. Back up the three existing files on your web host.
2. Replace `index.html`, `styles.css`, and `script.js` with the files here.
3. **Keep your existing `/assets` folder and logo file intact.** The ZIP intentionally does not include or overwrite product photos, logos, or favicon files. All image paths are relative to your site's existing assets folder.
4. Hard refresh (Ctrl/Cmd + Shift + R) on both desktop and mobile to load fresh CSS/JS.

## Logo

The header uses `assets/SDL_Logo_Header.png` (the existing logo path). It is a little larger: 78px high on desktop and 62px high on mobile. Edit `.brand-logo` in `styles.css` to adjust.

## Dynamic Foot Wedge gallery

These five existing live-site image files are referenced:

- `assets/DSC03273.jpg`
- `assets/DSC03274.jpg`
- `assets/DSC03276.jpg`
- `assets/DSC03302.jpg`
- `assets/DSC03303.jpg`

To add your GIF, copy it to `/assets/Dynamic_Wedge-Demo.gif`, then uncomment the `<img ...Dynamic_Wedge-Demo.gif...>` line in the Dynamic Wedge gallery in `index.html`. If the GIF has a different name, change that file path.

Use a normal `<img class="gallery-slide" data-slide ...>` line for additional photos in either product gallery. Dots and image counts are created automatically. Galleries with one image automatically hide their carousel dots and arrows.

Desktop: hover for photo navigation arrows and zoom icon, click to expand.
Mobile: swipe photo sideways to change, tap photo to enlarge, tap dots to select; the small zoom icon stays visible. The expanded viewer also supports swiping, arrows, and a close button.

## Etsy and inventory

The Dynamic Foot Wedge's primary button links to this exact Etsy listing ID, using a clean URL:
`https://www.etsy.com/listing/4508748579/dynamic-foot-wedge-foot-stretch-plantar`

The page does not claim a price or that stock is available. The alternative CTA fills out a purchase-interest email form. The Static Wedge has the same interest email pathway, but no Etsy link was supplied for it.

## Contact form

The contact section retains the existing mailto approach: submitting the form opens the visitor's email app with the message prefilled; it **does not** store or send data automatically. No backend or third-party dependency is needed, but visitors must have an email app configured. The direct email link remains available as an alternative.

## External font note

The site uses DM Sans and Manrope via Google Fonts. If those fonts cannot load, it falls back to Arial / system sans-serif automatically.