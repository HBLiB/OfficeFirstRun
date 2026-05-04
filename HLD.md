# High-Level Design — Freelancer POC Website

## Overview
A proof-of-concept freelancer website for an ISP & datacenter networking consultant.
Full-stack: React frontend consuming a Python API backend.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React + Vite | Fast scaffolding, component-based, easy fetch integration |
| Backend | FastAPI + SQLite | Lightweight, auto-generates OpenAPI docs, zero-infra persistence |
| Persistence | SQLite via SQLAlchemy | Single-file DB, no server needed, good enough for POC |

## Directory Layout

```
front/          — React app (Vite)
back/           — FastAPI app
```

## Pages (Frontend)

1. **Home** — hero banner, elevator pitch (who + what)
2. **Services** — fetched from API, grouped by category (ISP Networking, DC Networking)
3. **About / Experience** — brief bio, key experience highlights
4. **Contact** — form that POSTs to backend

## API Contract

Base URL: `http://localhost:8000`

### GET /api/services

Returns all services, grouped by category.

```json
{
  "categories": [
    {
      "name": "ISP Networking",
      "services": [
        {
          "id": 1,
          "title": "BGP Design & Optimization",
          "summary": "Full-mesh and route-reflector designs, policy tuning, community strategies.",
          "icon": "network"
        }
      ]
    },
    {
      "name": "Datacenter Networking",
      "services": [
        {
          "id": 5,
          "title": "EVPN/VXLAN Fabric",
          "summary": "Spine-leaf fabric design with EVPN control plane.",
          "icon": "server"
        }
      ]
    }
  ]
}
```

### GET /api/case-studies

Returns a list of anonymized case studies.

```json
{
  "case_studies": [
    {
      "id": 1,
      "title": "Regional ISP Peering Optimization",
      "category": "ISP Networking",
      "challenge": "High transit costs, single upstream dependency.",
      "solution": "Established IXP presence at 3 exchanges, deployed route-server peering.",
      "result": "40% transit cost reduction, improved latency."
    }
  ]
}
```

### POST /api/contact

Submit the contact form.

**Request:**
```json
{
  "name": "string (required, 1-100 chars)",
  "email": "string (required, valid email)",
  "company": "string (optional)",
  "message": "string (required, 1-2000 chars)"
}
```

**Success (201):**
```json
{
  "status": "ok",
  "message": "Thank you, we'll be in touch."
}
```

**Validation error (422):**
```json
{
  "detail": [{"field": "email", "message": "Invalid email address"}]
}
```

### CORS

Backend must allow `http://localhost:5173` (Vite dev server).
