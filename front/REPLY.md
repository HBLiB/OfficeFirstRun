# Round 7 Reply

## What I did
Implemented all three new features plus nav update:

### 1. Lab / Topology Page (`/lab`)
- SVG-based network topology with hub-spoke layout (h-fw at center-top, 3 spokes below)
- Clickable nodes show detail panel with description and services list
- Color-coded by type: firewall=red, server=blue, gpu=green, lab=purple
- Metadata header with title, description, total routes badge
- Mock fallback with 4 nodes and 3 eBGP links

### 2. Projects Strip (Home page)
- Horizontal scrollable strip of project cards below the hero
- Each card shows name, tagline, tech stack badges, status badge (active=green, in-dev=amber)
- Fetches from `GET /api/projects` with mock fallback

### 3. Case Study Detail Page (`/cases/:id`)
- Route with challenge/solution/outcome sections as styled blocks
- Category and year badges, tech_tags as pills, blockquote for quotes
- 404 handling with back link
- Services page now lists case studies as clickable cards linking to `/cases/:id`

### 4. Navigation + Theme
- Added "Lab" and "Projects" links to navbar
- Converted entire site to dark theme (dark backgrounds, light text, accent colors)

## Files created
- `src/pages/Lab.jsx`, `src/pages/CaseDetail.jsx`
- `src/components/ProjectsStrip.jsx`
- `src/data/mockTopology.js`, `src/data/mockProjects.js`, `src/data/mockCaseStudies.js`

## Files modified
- `src/App.jsx` — new routes and nav links
- `src/pages/Home.jsx` — added ProjectsStrip
- `src/pages/Services.jsx` — added case studies list with links
- `src/index.css` — full dark theme rewrite + all new component styles
- `LLD.md` — updated component structure docs
