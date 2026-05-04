# Round 14 — Front

## Task: Scroll-to-Top Button

Add a small floating "scroll to top" button that appears when the user scrolls down past 300px on any page.

### Requirements

1. **`src/components/ScrollToTop.jsx`** — new component:
   - Renders a fixed-position button (bottom-right, above where toasts appear).
   - Only visible when `window.scrollY > 300`.
   - Smooth-scrolls to top on click.
   - Accessible: `aria-label="Scroll to top"`.

2. **`src/index.css`** — add styles:
   - Circular button, semi-transparent dark background, light arrow/chevron icon (use a CSS-only ▲ character).
   - Fade-in / fade-out transition.

3. **`src/App.jsx`** — render `<ScrollToTop />` once at the app root so it works on every page.

### Constraints

- No external dependencies.
- Keep the component under 30 lines.
