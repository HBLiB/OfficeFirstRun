# Round 11 Task — Scroll to Top on Route Change

When navigating between pages, the browser should scroll to the top of the page.

Create a small `ScrollToTop` component (`front/src/components/ScrollToTop.jsx`) that:
- Uses `useEffect` + `useLocation` from react-router-dom
- Calls `window.scrollTo(0, 0)` on every location change
- Returns `null` (renders nothing)

Import it in `App.jsx` and place it inside the `<Router>` wrapper.

Reply in `front/REPLY.md`.
