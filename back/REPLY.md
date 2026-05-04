# Round 7 Reply

## Status: Done

## What I built
- **GET /api/topology** — returns 4-node hub-spoke BGP topology (h-fw hub, 3 spokes) with x/y coordinates, AS numbers, services, and metadata (50 total routes)
- **GET /api/projects** — returns 4 featured tools: h-cli, h-ssh, h-knowledge, Batfish+MPLS with tech stacks and status
- **GET /api/case-studies/{id}** — returns single case study with enriched fields (tech_tags, quote, year); 404 for unknown IDs
- Updated case studies seed data to 4 real-world cases: Worldstream EVPN, NEP telemetry, EBPI ACI+OpenStack, Flow Analytics
- GET /api/case-studies list endpoint still returns summary-only fields (no tech_tags/quote/year)
- Updated `back/LLD.md` with all new endpoints and seed data

## Decisions
- Used a single `CASE_STUDIES_LIST` as source of truth; list endpoint filters to summary fields, detail endpoint returns all fields
- Topology coordinates: hub (400,50) top-center, spokes evenly spaced at y=250
- `quote` field is `None` for EBPI case, present on the other 3

## Note
No network access for pip install — code verified by inspection.
