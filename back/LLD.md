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

Services and case studies are seeded as in-memory constants (no DB table needed for POC).

## Endpoints

| Method | Path              | Response | Description                        |
|--------|-------------------|----------|------------------------------------|
| GET    | /api/services     | 200      | Services grouped by category       |
| GET    | /api/case-studies  | 200      | List of anonymized case studies    |
| POST   | /api/contact      | 201/422  | Submit contact form to SQLite      |

## Validation (POST /api/contact)
- `name`: required, 1-100 chars (stripped)
- `email`: required, valid email (via `EmailStr`)
- `company`: optional string
- `message`: required, 1-2000 chars (stripped)

On validation failure, FastAPI returns 422 with `detail` array containing field-level errors.

## CORS
Allows origin `http://localhost:5173`.

## Running
```bash
cd back/
pip install -r requirements.txt
uvicorn main:app --reload
```
