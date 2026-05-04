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

---

## Round 7 Additions

### New Pages (Frontend)

5. **Lab / Topology** — interactive SVG network topology visualization (hub-spoke BGP or spine-leaf EVPN), with clickable nodes showing AS numbers, protocols, and peering sessions. Data fetched from API.
6. **Projects** — tool/product cards fetched from API, styled as a strip (on Home or dedicated section).
7. **Case Study Detail** — `/cases/:id` route, fetched by ID, with challenge/solution/outcome layout, tech tags, and optional quote.

### GET /api/topology

Returns network topology as nodes and links for SVG rendering.

```json
{
  "nodes": [
    {
      "id": "h-fw",
      "label": "h-fw (FortiGate)",
      "type": "firewall",
      "asn": 65000,
      "x": 400,
      "y": 50,
      "description": "Central hub firewall, BGP route reflector"
    },
    {
      "id": "h-srv",
      "label": "h-srv",
      "type": "server",
      "asn": 65010,
      "x": 200,
      "y": 250,
      "services": ["HAProxy", "Grafana", "NetBox", "Gitea", "h-cli"],
      "description": "Infrastructure services hub"
    }
  ],
  "links": [
    {
      "source": "h-fw",
      "target": "h-srv",
      "protocol": "eBGP",
      "label": "AS65000 ↔ AS65010",
      "prefixes": 12
    }
  ],
  "metadata": {
    "title": "Homelab Network — Hub-Spoke BGP",
    "total_routes": 50,
    "description": "Production-grade homelab: hub-spoke BGP, full telemetry, EVE-NG lab integration"
  }
}
```

### GET /api/projects

Returns featured tools/products.

```json
{
  "projects": [
    {
      "id": 1,
      "name": "h-cli",
      "tagline": "AI-powered infrastructure management",
      "description": "9 Docker services, 44 hardening items, unified CLI for network operations.",
      "tech": ["Python", "Docker", "Redis", "FastAPI"],
      "status": "active",
      "url": null
    }
  ]
}
```

### GET /api/case-studies/{id}

Returns a single case study with full detail.

```json
{
  "id": 1,
  "title": "Regional ISP Peering Optimization",
  "category": "ISP Networking",
  "challenge": "High transit costs, single upstream dependency.",
  "solution": "Established IXP presence at 3 exchanges, deployed route-server peering.",
  "result": "40% transit cost reduction, improved latency.",
  "tech_tags": ["BGP", "IXP", "Route Servers", "Peering Policy"],
  "quote": "All built by hand, before AI was an option.",
  "year": "2020"
}
```

Returns 404 if ID not found:
```json
{"detail": "Case study not found"}
```
