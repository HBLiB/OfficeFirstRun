# Round 6 Task — Backend: Freelancer POC API

## Read First
`HLD.md` in repo root has the full architecture and **API contract**. Read it before starting.

## What to Build
A FastAPI application in `back/` with these endpoints:

### 1. GET /api/services
Return services grouped by category. Seed the data at startup (hardcoded or from a seed file). Include at minimum:

**ISP Networking** (4 services): BGP Design & Optimization, Peering Strategy (IXP, PNI), Transit Engineering, MPLS/Segment Routing

**Datacenter Networking** (4 services): EVPN/VXLAN Fabric Design, Spine-Leaf Architecture, DCI (Datacenter Interconnect), Network Automation & Observability

Each service: `id`, `title`, `summary` (1-2 sentences), `icon` (string key).

### 2. GET /api/case-studies
Return 3-4 anonymized case studies. Each: `id`, `title`, `category`, `challenge`, `solution`, `result`. Seed at startup.

### 3. POST /api/contact
Validate and persist contact form submissions to SQLite. Fields: `name` (required), `email` (required, valid), `company` (optional), `message` (required). Return 201 on success, 422 with field-level errors on validation failure. See HLD.md for exact response shapes.

### 4. CORS
Allow origin `http://localhost:5173`.

## Constraints
- FastAPI + SQLAlchemy + SQLite. Use `back/data.db` for the database file (gitignore it).
- Include a `back/requirements.txt`.
- Runnable with `pip install -r requirements.txt && uvicorn main:app` from the `back/` directory.
- All files must live under `back/`.

## Deliverable
Working API matching the contract in HLD.md. Write `back/LLD.md` documenting your data model and endpoints. Reply in `back/REPLY.md`.
