# Round 14 — Front Reply

## Task: Scroll-to-Top Button

### What changed

1. **`src/components/ScrollToTop.jsx`** — Rewrote the existing route-change scroll component to also render a floating "scroll to top" button. Preserves the route-change scroll-to-top behavior from round 11. Uses `useState` + `useEffect` with a passive scroll listener to show/hide at 300px threshold. Smooth-scrolls on click. Includes `aria-label="Scroll to top"`.

2. **`src/index.css`** — Added styles for `.scroll-to-top`: fixed position (bottom-right, above toast area), circular, semi-transparent dark background, light ▲ character, fade-in/fade-out via opacity transition.

3. **`src/App.jsx`** — No changes needed; already renders `<ScrollToTop />` at the app root from round 11.

### Decisions

- Kept the existing route-change `scrollTo(0,0)` behavior alongside the new button, since both are useful and share the same component file.
- Positioned at `bottom: 5rem` to sit above the toast notification area (`bottom: 1.5rem`).
- Component is 27 lines, under the 30-line constraint.
- No external dependencies added.
