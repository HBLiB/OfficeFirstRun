# Round 13 — Assignment

## Task: Toast / Notification Component

Create a lightweight, reusable `Toast` notification component for showing brief success/error/info messages to the user.

### Requirements

1. **`src/components/Toast.jsx`** — accepts props: `message` (string), `type` ("success" | "error" | "info"), `onClose` (callback), `duration` (ms, default 3000).
2. Auto-dismisses after `duration` ms; can also be closed manually via an × button.
3. **Styling in `src/index.css`** — distinct colors for each type (green/success, red/error, blue/info). Position fixed bottom-right. Fade-in/out animation.
4. Add a demo usage in one existing page (e.g., show a success toast after a user action or page load) to prove it works.

### Constraints

- Keep it simple — no external toast libraries.
- Scoped to `front/` only.
