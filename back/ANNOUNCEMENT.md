# Round 14 — Back

## Task: CORS Tightening + Response Headers

Harden the HTTP response headers and tighten CORS configuration.

### Requirements

1. **Security headers middleware** — add a middleware (or extend the existing one) that sets these headers on every response:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`

2. **CORS origin list** — replace the wildcard `"*"` in `allow_origins` with an explicit list read from an environment variable `ALLOWED_ORIGINS` (comma-separated), defaulting to `["http://localhost:5173"]` for local dev.

### Constraints

- No new dependencies (use `os.environ` for the env var).
- Keep all changes in `back/main.py`.
