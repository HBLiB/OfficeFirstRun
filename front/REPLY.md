# Round 13 — Reply

## Completed: Toast / Notification Component

### Changes

1. **`src/components/Toast.jsx`** — New reusable Toast component accepting `message`, `type` (success/error/info), `onClose`, and `duration` (default 3000ms). Auto-dismisses after the duration; closable via × button.

2. **`src/index.css`** — Added Toast styles: fixed bottom-right positioning, distinct colors per type (green/success, red/error, blue/info), fade-in/out animations using `translateY` + `opacity`.

3. **`src/pages/Contact.jsx`** — Integrated Toast to show success/error notifications after form submission. Demonstrates all toast types depending on the API response.

### Decisions

- Used a two-phase dismiss: set exit animation class, then remove component after 300ms to allow the fade-out to complete.
- Chose the Contact page for demo integration since it already has user actions (form submit) that naturally map to success/error feedback.
- No external libraries used — pure React + CSS animations.
