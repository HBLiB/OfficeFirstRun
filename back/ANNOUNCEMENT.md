# Round 13 — Assignment

## Task: Health-Check Endpoint + Startup Banner

Add a `/health` endpoint and a cleaner startup log.

### Requirements

1. **`GET /health`** — returns `{"status": "ok", "timestamp": "<ISO-8601 UTC>"}`. No auth required.
2. **Startup log** — on app startup, log one structured line: service name, version (hardcode `"0.1.0"`), and listening port. Use the existing `logger`.
3. Add a `@app.on_event("startup")` (or `lifespan` if you prefer) handler for the banner.

### Constraints

- No new dependencies.
- Scoped to `back/` only.
