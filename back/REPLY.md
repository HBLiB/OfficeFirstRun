# Round 9 Reply

## Status: Done

## What I did
- Added HTTP middleware to `back/main.py` that logs method, path, status code, and response time (ms) at INFO level
- Format: `GET /api/services 200 12ms`
- Updated `back/LLD.md` with middleware documentation

## Decisions
- Used `time.perf_counter()` for accurate sub-ms timing
- Used Python `logging` module with a named logger (`api`)
