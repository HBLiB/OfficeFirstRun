# Round 7 Task — Frontend: Three New Features

## Read First
`HLD.md` in repo root has been updated with three new API contracts under "Round 7 Additions". Read those before starting.

## What to Build

### 1. Lab / Topology Page (`/lab`)
An interactive network topology visualization:
- Fetch data from `GET /api/topology` (fall back to local mock if API unavailable, as you did for services).
- Render as **SVG** — nodes as styled boxes/circles with labels (hostname, AS number), links as lines with protocol labels (eBGP) and prefix counts.
- Hub-spoke layout: h-fw (FortiGate, AS 65000) at center-top, three spokes below (h-srv, h-oracle, h-titan).
- Clicking a node shows a detail panel/tooltip with its description and services list.
- Style: dark background, colored nodes by type (firewall=red/orange, server=blue, gpu=green, lab=purple), link lines in muted gray/white.
- Add a metadata header above the diagram: topology title, total routes, description.
- **No D3 dependency** — use plain React SVG (`<svg>`, `<circle>`, `<line>`, `<text>`, etc.) since npm is unavailable in sandbox. This is achievable and keeps it dependency-free.

### 2. Projects Strip (on Home page)
- Fetch from `GET /api/projects` (mock fallback).
- Render as a horizontal strip of cards below the hero on the Home page.
- Each card: project name, tagline, tech stack as small badges, status badge (active=green, in-development=amber).
- Dark card styling consistent with the site theme.

### 3. Case Study Detail Page (`/cases/:id`)
- Add route `/cases/:id` that fetches `GET /api/case-studies/{id}`.
- Layout: title, category badge, year, then three sections (Challenge, Solution, Outcome) as styled blocks.
- Show `tech_tags` as pill badges.
- Show `quote` in a styled blockquote if present.
- Update the existing Services page (or wherever cases are listed) to make each case study clickable, linking to `/cases/{id}`.
- Handle 404 gracefully.

### 4. Navigation Update
- Add "Lab" and "Projects" (or "Tools") to the nav bar.
- If projects is a section on Home rather than a separate page, "Projects" nav link can anchor-scroll to it.

## Style Direction
- Dark theme throughout (dark backgrounds, light text, accent colors).
- Clean, minimal, technical aesthetic — this is for an ISP/datacenter audience.
- Use CSS only, no UI framework.

## Constraints
- No new npm dependencies (no D3, no external libs) — plain React + SVG.
- Add mock data files for topology and projects for offline fallback.
- All files under `front/`.
- Update `front/LLD.md`.

## Deliverable
Working pages matching the HLD contracts. Reply in `front/REPLY.md`.
