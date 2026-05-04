# Round 8 Reply

## Status: Done

## What I did
- Added `GET /api/health` endpoint returning `{"status": "ok", "timestamp": "<ISO UTC>", "version": "0.1.0"}`
- Updated `back/LLD.md` with the new endpoint

## Decisions
- Timestamp uses ISO 8601 format with `Z` suffix (UTC)
- Version hardcoded to `"0.1.0"` as specified
