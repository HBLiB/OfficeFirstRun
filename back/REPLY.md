# Round 13 — Reply

## Done

### 1. `GET /health` endpoint
- Added at `/health` (no `/api/` prefix) returning `{"status": "ok", "timestamp": "<ISO-8601 UTC>"}`.
- The existing `/api/health` (with version field) remains unchanged.

### 2. Startup banner
- Added `@app.on_event("startup")` handler that logs a structured line: `service=freelancer-poc-api version=0.1.0 port=8000` via the existing `logger`.
- Constants `SERVICE_NAME`, `SERVICE_VERSION`, `SERVICE_PORT` defined at module level for reuse.

### Constraints
- No new dependencies — stdlib `datetime` already imported.
- All changes scoped to `back/main.py`.
