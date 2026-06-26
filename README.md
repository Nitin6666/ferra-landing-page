# Ferra — AI Data Automation Landing Page

Built for the "Next-Gen AI Platform Speed Run" Phase 1 hackathon round.

## Stack
- React + Vite (vanilla, no meta-framework needed for a single page)
- Tailwind CSS v4 (utility styling only — no component/animation libraries)
- Zero runtime UI/animation dependencies. All motion is native CSS
  transitions / the grid-template-rows trick — nothing from Framer Motion,
  Radix, shadcn, etc.

## Feature 1 — Matrix-driven pricing & isolated currency switcher
- `src/data/pricingMatrix.js` — the multi-dimensional config (tier ×
  currency × regional tariff), plus the flat 20% annual multiplier.
- `src/data/pricingEngine.js` — pure function that derives the final price;
  nothing is hardcoded per currency/cycle combination.
- `src/components/PricingMatrix.jsx` — currency and billing-cycle are kept
  in refs, not React state. Toggling either calls `applyPricing()`, which
  writes straight into the price `<span>` text nodes via refs. No
  `setState` fires on toggle, so neither this component nor its parent
  re-renders — verify with React DevTools "Highlight updates": the overlay
  stays dark when you switch currency/cycle.

## Feature 2 — Bento-to-Accordion with context lock
- `src/components/BentoAccordion.jsx` — `activeIndex` is shared state read
  by both the desktop bento grid and the mobile accordion. A
  `matchMedia` listener swaps which layout is rendered on breakpoint
  cross, but never resets `activeIndex` — so whatever node you were
  hovering stays the open panel after the layout folds to mobile.
- The accordion expand/collapse uses the native `grid-template-rows: 0fr
  → 1fr` CSS trick, animated with a plain CSS transition — no JS height
  measurement, no animation library.

## Motion timing
Matches the brief's spec: micro-interactions at ~180ms ease-out
(`var(--ease-out-micro)`), structural reflows at ~360ms ease-in-out
(`var(--ease-inout-layout)`). The hero's entry orchestration is staggered
CSS-only and resolves at ~430ms, inside the 500ms cap.

## ⚠️ Before you submit
This scaffold was built without the official `asset_package.zip` (it
wasn't attached when the project was generated). Swap in the real assets
or you'll lose the 15-pt "Asset Compliance" line item:

1. **SVGs** — drop the provided icon set into `src/assets/svg/` and
   replace the inline placeholder `<svg>` checkmarks/chevrons in
   `PricingMatrix.jsx` and `BentoAccordion.jsx`.
2. **Fonts** — the CSS expects two font roles, `--font-display` and
   `--font-mono`/`--font-body`, declared in `src/index.css`. Replace the
   placeholder stacks with `@font-face` rules pointing at the official
   font files, using the official family names.
3. **Colors** — replace the hex values under `:root` in `src/index.css`
   with the official palette. Every color in the UI is wired through
   those CSS variables, so this is a one-file swap.

## Run locally
```
npm install
npm run dev
```

## Build
```
npm run build
```

## Deploy
Push to a public GitHub repo, then deploy `dist/` (or the repo directly)
to Vercel/Netlify/GitHub Pages and put the live URL in your submission.
