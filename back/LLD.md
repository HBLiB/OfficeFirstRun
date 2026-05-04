# Backend Low-Level Design

## Stack
- **FastAPI** — REST API framework
- **SQLAlchemy 2.0** — ORM (declarative)
- **SQLite** — persistence (`back/data.db`, gitignored)
- **Pydantic v2** — request validation (with `email-validator`)

## Data Model

### Table: `contact_submissions`
| Column     | Type         | Constraints              |
|------------|--------------|--------------------------|
| id         | INTEGER      | PK, autoincrement        |
| name       | VARCHAR(100) | NOT NULL                 |
| email      | VARCHAR(255) | NOT NULL                 |
| company    | VARCHAR(255) | nullable                 |
| message    | TEXT         | NOT NULL                 |
| created_at | DATETIME     | default: UTC now         |

Services, case studies, topology, and projects are seeded as in-memory constants (no DB tables needed for POC).

## Endpoints

| Method | Path                    | Response | Description                            |
|--------|-------------------------|----------|----------------------------------------|
| GET    | /api/services           | 200      | Services grouped by category           |
| GET    | /api/case-studies       | 200      | List of case studies (summary fields)  |
| GET    | /api/case-studies/{id}  | 200/404  | Single case study with full detail     |
| GET    | /api/topology           | 200      | Hub-spoke BGP topology (nodes + links) |
| GET    | /api/projects           | 200      | Featured tools/products                |
| POST   | /api/contact            | 201/422  | Submit contact form to SQLite          |
| GET    | /api/health             | 200      | Health check with timestamp and version |

## Seed Data

### Case Studies (4)
1. Worldstream EVPN/VXLAN Fabric (2021)
2. NEP Broadcast Streaming Telemetry (2022)
3. EBPI ACI + OpenStack Integration (2020)
4. Flow Analytics Platform (2019)

Detail endpoint includes `tech_tags`, `quote`, and `year` fields.

### Topology (4 nodes, 3 links)
- h-fw (FortiGate, AS 65000) — hub
- h-srv (AS 65010), h-oracle (AS 65100), h-titan (AS 65101) — spokes
- All links are eBGP peering through h-fw, total 50 prefixes

### Projects (4)
- h-cli, h-ssh, h-knowledge (active), Batfish+MPLS (in-development)

## Validation (POST /api/contact)
- `name`: required, 1-100 chars (stripped)
- `email`: required, valid email (via `EmailStr`)
- `company`: optional string
- `message`: required, 1-2000 chars (stripped)

## CORS
Allows origin `http://localhost:5173`.

## Running
```bash
cd back/
pip install -r requirements.txt
uvicorn main:app --reload
```
