# Round 8 Task — Add Health Check Endpoint

Add a `GET /api/health` endpoint to `back/main.py`.

Response (200):
```json
{
  "status": "ok",
  "timestamp": "2026-05-04T13:00:00Z",
  "version": "0.1.0"
}
```

- `timestamp` should be the current UTC time in ISO format.
- `version` can be a hardcoded string `"0.1.0"`.

Small change — just the endpoint. Update `back/LLD.md` briefly. Reply in `back/REPLY.md`.
