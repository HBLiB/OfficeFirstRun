# Round 7 Task — Backend: Three New API Endpoints

## Read First
`HLD.md` in repo root has been updated with three new API contracts under "Round 7 Additions". Read those before starting.

## What to Build

### 1. GET /api/topology
Serve the homelab network topology as nodes + links for frontend SVG rendering. Seed data modeled on this real homelab:

**Nodes (4):**
- `h-fw` — FortiGate firewall, AS 65000, central hub / BGP route reflector
- `h-srv` — Infrastructure services (HAProxy, Grafana, NetBox, Gitea, h-cli), AS 65010
- `h-oracle` — Dual RTX 5090, local LLM inference (h-knowledge, vLLM, Ollama), AS 65100
- `h-titan` — EVE-NG Pro + RTX 3090/4070Ti, unlimited lab topologies (CLOS/EVPN/MPLS), AS 65101

**Links (3, all eBGP peering through h-fw hub):**
- h-fw ↔ h-srv (12 prefixes)
- h-fw ↔ h-oracle (8 prefixes)
- h-fw ↔ h-titan (30 prefixes, lab routes)

Include `metadata` with title, total_routes (50), and a description. Include `x`/`y` coordinates for each node laid out in a hub-spoke pattern (hub at top center, spokes below). See HLD.md for exact response shape.

### 2. GET /api/projects
Serve featured tools/products. Seed with these 4 entries:

1. **h-cli** — "AI-powered infrastructure management" — 9 Docker services, 44 hardening items, unified CLI. Tech: Python, Docker, Redis, FastAPI. Status: active.
2. **h-ssh** — "Multi-vendor network automation" — parallel SSH/NETCONF/eAPI, commit-confirmed rollback. Tech: Python, Paramiko, NETCONF, eAPI. Status: active.
3. **h-knowledge** — "LLM-optimized vendor knowledge base" — 50k+ verified vectors, 7-stage Redis pipeline. Tech: Python, Redis, Qdrant, vLLM. Status: active.
4. **Batfish+MPLS** — "Network verification with MPLS support" — Batfish fork adding MPLS/LDP/RSVP analysis. Tech: Java, Batfish, MPLS. Status: in-development.

See HLD.md for exact response shape.

### 3. GET /api/case-studies/{id}
Return a single case study by ID. Enrich the existing seed data with these new fields:
- `tech_tags`: list of technology strings
- `quote`: optional string (use "All built by hand, before AI was an option." for at least 2)
- `year`: string

Return 404 `{"detail": "Case study not found"}` for unknown IDs.

Update the existing case studies seed data to include at least 4 entries matching h-network.nl's real cases (Worldstream EVPN fabric, NEP broadcast telemetry, EBPI ACI+OpenStack, Flow Analytics Platform). See HLD.md for response shape.

## Constraints
- Add to existing `back/main.py` — don't restructure.
- All files under `back/`.
- Update `back/LLD.md` with the new endpoints.

## Deliverable
Working endpoints matching HLD.md contracts. Reply in `back/REPLY.md`.
