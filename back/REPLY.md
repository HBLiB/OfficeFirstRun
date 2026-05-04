# Round 14 — Back — REPLY

## Done

### 1. Security Headers Middleware
Extended the existing `request_id_and_logging` middleware to set three security headers on every response:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 2. CORS Origin List
- Replaced the hardcoded origin list with `os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173")`.
- Parses comma-separated values, strips whitespace, filters empties.
- Default remains `["http://localhost:5173"]` for local dev.

### Constraints
- No new dependencies added.
- All changes in `back/main.py`.
