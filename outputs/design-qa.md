# PartVance Website QA

Date: 2026-07-10

## Checks Completed

- Production build passes with `pnpm build`.
- Local dev server runs at `http://localhost:5173/`.
- Homepage loads with the PartVance logo, favicon assets, hero copy, animated dashboard, product suite, problem cards, stats, use cases, testimonials, FAQ, CTA, and footer.
- Routes checked: `/`, `/products`, `/forecast`, `/risk`, `/suppliers`, `/use-cases`, `/integrations`, `/resources`, `/pricing`, `/about`, `/contact`, `/demo`, `/signin`, `/privacy`, `/terms`, `/gdpr`.
- Demo form submit state checked successfully.
- Client-side route changes reset scroll to the top so the fixed header does not overlap page heroes.
- Browser console smoke check reported no warnings or errors.
- Desktop and mobile screenshots captured in `outputs/qa/`.
- Browser comments from the homepage annotation pass were addressed:
  - Hero keywords now use brand color emphasis.
  - Product cards have hover border states.
  - Workflow cards have a sliding green hover border.
  - Use-case bento is rearranged at tablet and desktop widths.
  - Testimonial spacing and card rhythm were tightened.
  - Integrations was rebuilt into a clearer systems-to-decisions map.
  - Pricing cards have subtle green hover borders.
  - FAQ has a shaped branded background.
- Latest product-page refinement completed:
  - Homepage hero dashboard was left unchanged.
  - `/forecast`, `/risk`, and `/suppliers` now use product-specific visual dashboards instead of the homepage dashboard.
  - `/signin` now uses a secure workspace/trust panel instead of the product dashboard.
  - Homepage includes an auto-scrolling trusted-by strip below the hero.
  - DOM checks confirm the homepage has one `.hero-dashboard`, product pages have zero `.hero-dashboard` and one `.product-visual`, and `/signin` has zero `.hero-dashboard`.

## QA Screenshots

- `outputs/qa/annotations-tablet-final.png`
- `outputs/qa/annotations-mobile-final.png`

## Notes

- The CTA/footer uses a lazy-loaded HLS background video. If the video stream cannot load, the section still renders with dark liquid-glass styling, readable text, and working CTAs.
- The site is frontend-only. Forms show prototype success states and are ready for backend wiring later.
