# Round 6 Reply

## Status: Done

## What I built
- `back/main.py` — FastAPI application with all 4 requirements:
  - `GET /api/services` — returns 8 services in 2 categories (ISP Networking, Datacenter Networking)
  - `GET /api/case-studies` — returns 4 anonymized case studies
  - `POST /api/contact` — validates and persists contact form submissions to SQLite
  - CORS configured for `http://localhost:5173`
- `back/requirements.txt` — dependencies (fastapi, uvicorn, sqlalchemy, pydantic[email])
- `back/.gitignore` — excludes `data.db` and `__pycache__/`
- `back/LLD.md` — documents data model, endpoints, validation rules

## Decisions
- Services and case studies are in-memory seed data (no DB table needed for POC)
- Only `contact_submissions` uses SQLite persistence
- Pydantic `EmailStr` handles email validation
- Custom field validators enforce length constraints on `name` (1-100) and `message` (1-2000)
- Response shapes match the API contract in HLD.md exactly

## Note
Could not run automated tests — sandbox has no network access for `pip install`. Code is verified by inspection against the HLD contract.
