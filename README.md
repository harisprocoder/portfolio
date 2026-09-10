# M. Haris Portfolio

A premium, responsive one-page portfolio for **M. Haris — Web Developer & UI/UX Designer**, based in Karachi, Pakistan.

## Built with

- Vite
- Semantic HTML
- Modern CSS with responsive layout, custom design tokens, CSS artwork, and subtle motion
- Vanilla JavaScript for navigation, scroll reveal, testimonials, clipboard copy, and contact form behavior

## Local development

```bash
npm install
npm run dev
```

The development server listens on `0.0.0.0` so it can be previewed in a hosted sandbox. The production build is generated with:

```bash
npm run build
npm run preview
```

## Project structure

```text
.
├── index.html          # Portfolio markup, SEO metadata, JSON-LD, and content
├── src/
│   ├── main.js         # Interactions and progressive enhancement
│   └── styles.css      # Design system, layout, responsive states, and artwork
├── vite.config.js      # Dev/preview host configuration
└── package.json        # Scripts and Vite dependency
```

## Design system

| Token | Value |
| --- | --- |
| Background | `#0A0702` |
| Text | `#F5EFE6` |
| Primary accent | `#FF8400` |
| Card | `#1A1612` |
| Muted text | `#A89F8F` |

The visual direction is soft dark, warm, editorial, and spacious. Project covers are deliberately built as lightweight CSS compositions instead of placeholder stock imagery, keeping the site fast and aligned with the provided project identities.

## Contact form

The form validates the required fields in the browser and prepares a pre-filled email draft addressed to `harishuja05@gmail.com` using `mailto:`. This keeps the portfolio functional without inventing a third-party form endpoint or storing visitor data. For a hosted backend, replace the submit handler in `src/main.js` with the preferred provider or API route.

## Portfolio links

- [A Plus Luxury](https://a-plus-luxury1.vercel.app/)
- [Nimra Beauty](https://nimra-beauty-saloon.vercel.app/)
- [Luma Elevate](https://luma-elevate-store.vercel.app/)
- [Student OS](https://student-os-smoky.vercel.app/)
- [GitHub](https://github.com/harisprocoder)
