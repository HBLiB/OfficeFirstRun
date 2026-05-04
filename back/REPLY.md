# Round 12 — Reply

## What changed

Updated `main.py` to add Request ID middleware with structured logging:

1. **X-Request-ID header**: Every request gets a UUID4 assigned via `uuid.uuid4()`. The ID is stored on `request.state.request_id` and added to the response as `X-Request-ID`.
2. **Structured logging**: The existing `log_requests` middleware was replaced with a single `request_id_and_logging` middleware that logs: method, path, status code, duration (ms), and request_id — all in one line.
3. **No new dependencies** — uses stdlib `uuid` and `logging` only.

## Decisions

- Combined request-ID generation and logging into one middleware (avoids double middleware overhead and keeps the request_id in scope for the log line).
- Log format: `GET /api/services 200 12ms request_id=<uuid>` — structured enough for grep/parsing but still human-readable.
- Duration uses `time.perf_counter()` for accuracy, rounded to 1 decimal.

## Files modified

- `back/main.py`
