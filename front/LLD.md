# Frontend Low-Level Design

## Stack
- React 18 + Vite 5
- react-router-dom v6 (client-side routing)
- Plain CSS (no framework)

## Component Structure

```
src/
├── main.jsx              — entry point, mounts <App> inside <BrowserRouter>
├── App.jsx               — layout (navbar, routes, footer)
├── config.js             — API_BASE_URL from env (VITE_API_URL) or default localhost:8000
├── index.css             — all styles
├── data/
│   └── mockServices.js   — fallback data when API is unavailable
└── pages/
    ├── Home.jsx           — hero section with CTA → /contact
    ├── Services.jsx       — fetches GET /api/services, falls back to mock data
    ├── About.jsx          — static bio and experience bullets
    └── Contact.jsx        — form POSTing to /api/contact with validation feedback
```

## API Integration
- `Services` fetches from `GET /api/services`; on failure, renders `mockServicesData` with a notice banner.
- `Contact` POSTs JSON to `POST /api/contact`; handles 201 (success), 422 (validation errors), and network errors.
- Base URL configurable via `VITE_API_URL` env var.

## Routing
| Path | Component |
|------|-----------|
| `/` | Home |
| `/services` | Services |
| `/about` | About |
| `/contact` | Contact |
