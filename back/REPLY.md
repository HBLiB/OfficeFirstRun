# Round 11 Reply

## Status: Done

## What I did
- Added in-memory rate limiting to `POST /api/contact`: 5 requests per IP per 10-minute window
- Returns 429 with `{"detail": "Too many requests. Please try again later."}` when exceeded
- Uses stdlib only (`collections.defaultdict` + `time.time()`)
- Updated `back/LLD.md`

## Decisions
- Timestamps older than 10 minutes are pruned on each request (sliding window)
- Rate state resets on server restart (acceptable for POC)
