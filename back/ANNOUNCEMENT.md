# Round 12 — Request ID Middleware & Structured Logging

## Task

Add a middleware that generates a unique `X-Request-ID` header for every request, and add basic structured logging (one log line per request with method, path, status, and duration).

## Requirements

1. Add a new middleware in `main.py` (or a small `middleware.py` module) that:
   - Generates a UUID4 `X-Request-ID` for each incoming request.
   - Attaches it to the response headers.
2. Add a simple request logger that logs: method, path, status code, duration (ms), and request ID.
3. Use Python `logging` — no extra dependencies.

## Scope

- Only touch files in `back/`.
- No changes to existing API contracts or response bodies.
