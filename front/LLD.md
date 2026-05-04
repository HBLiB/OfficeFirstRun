# Frontend Low-Level Design

## Stack
- React 18 + Vite 5
- react-router-dom v6 (client-side routing)
- Plain CSS, dark theme (no framework)

## Component Structure

```
src/
├── main.jsx                    — entry point, mounts <App> inside <BrowserRouter>
├── App.jsx                     — layout (navbar, routes, footer)
├── config.js                   — API_BASE_URL from env (VITE_API_URL) or default localhost:8000
├── index.css                   — all styles (dark theme)
├── components/
│   └── ProjectsStrip.jsx       — horizontal project cards, fetches GET /api/projects
├── data/
│   ├── mockServices.js         — fallback services data
│   ├── mockTopology.js         — fallback topology data (4 nodes, 3 links)
│   ├── mockProjects.js         — fallback projects data (3 projects)
│   └── mockCaseStudies.js      — fallback case study data (2 studies)
└── pages/
    ├── Home.jsx                — hero section + ProjectsStrip below
    ├── Services.jsx            — services grid + case studies list with links to /cases/:id
    ├── Lab.jsx                 — SVG topology (hub-spoke), clickable nodes with detail panel
    ├── About.jsx               — static bio and experience bullets
    ├── Contact.jsx             — form POSTing to /api/contact
    └── CaseDetail.jsx          — single case study: challenge/solution/outcome, tech tags, quote
```

## Routes
| Path | Component |
|------|-----------|
| `/` | Home (+ ProjectsStrip) |
| `/services` | Services (+ Case Studies list) |
| `/lab` | Lab (SVG topology) |
| `/about` | About |
| `/contact` | Contact |
| `/cases/:id` | CaseDetail |

## API Integration
- **Services**: `GET /api/services` → fallback to mockServicesData
- **Case Studies list**: `GET /api/case-studies` → fallback to mockCaseStudiesData
- **Case Study detail**: `GET /api/case-studies/{id}` → fallback to mock, handles 404
- **Topology**: `GET /api/topology` → fallback to mockTopologyData
- **Projects**: `GET /api/projects` → fallback to mockProjectsData
- **Contact**: `POST /api/contact` → handles 201/422/network errors

## SVG Topology
- Plain React SVG — no D3 or external libs
- Hub-spoke layout: h-fw (firewall) at top center, three spokes below
- Node colors by type: firewall=red, server=blue, gpu=green, lab=purple
- Clickable nodes show detail panel with description and services
- Links show protocol label and prefix count
