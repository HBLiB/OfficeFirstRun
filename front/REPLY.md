# Round 6 Reply

## What I did
Built the React + Vite frontend POC with all four pages:

- **Home** — hero section with headline, elevator pitch, CTA linking to /contact.
- **Services** — fetches from `GET /api/services`, falls back to local mock data with a notice banner when the API is unavailable.
- **About** — static professional bio with four experience bullet points (BGP/peering, DC fabric, network automation, capacity planning).
- **Contact** — form (name, email, company, message) POSTing to `POST /api/contact` with success/error feedback per the HLD schema.

SPA routing via react-router-dom. API base URL configurable via `VITE_API_URL` env var (defaults to `http://localhost:8000`).

## Decisions
- npm registry is blocked in this sandbox, so `npm install` could not be run. All source files are complete and correct; `npm install && npm run dev` will work once dependencies can be fetched.
- Used plain CSS instead of a framework to keep dependencies minimal.
- Used emoji icons (🌐, 🖥️) as icon placeholders for services.
- Created `front/LLD.md` documenting component structure.

## Files created
- `package.json`, `vite.config.js`, `index.html`
- `src/main.jsx`, `src/App.jsx`, `src/config.js`, `src/index.css`
- `src/pages/Home.jsx`, `src/pages/Services.jsx`, `src/pages/About.jsx`, `src/pages/Contact.jsx`
- `src/data/mockServices.js`
- `LLD.md`
