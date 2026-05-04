# Round 6 Task — Frontend: Freelancer POC Website

## Read First
`HLD.md` in repo root has the full architecture and **API contract**. Read it before starting.

## What to Build
A React app (Vite) in `front/` with these pages:

1. **Home** — hero section with a headline like "ISP & Datacenter Networking Consultant", a short elevator pitch, and a CTA button linking to Contact.
2. **Services** — fetch from `GET /api/services` and render grouped by category. Show title, summary, and an icon placeholder for each service. While the API is unavailable during dev, use a local fallback/mock so the page renders standalone.
3. **About / Experience** — hardcoded is fine. Brief professional bio, 3-4 bullet points of experience (BGP/peering, DC fabric design, network automation, etc.).
4. **Contact** — a form (name, email, company [optional], message) that POSTs to `POST /api/contact`. Show success/error feedback. See HLD.md for the request/response schema.

## Constraints
- Use React + Vite. Minimal dependencies — a CSS framework (e.g. plain CSS, or something lightweight) is fine, no heavy UI libraries.
- Client-side routing (react-router or equivalent) so it's a proper SPA.
- API base URL should be configurable (e.g. env var or a constant), default `http://localhost:8000`.
- Keep it clean but POC-grade — enough to demo, not pixel-perfect.
- All files must live under `front/`.

## Deliverable
Working React app that runs with `npm install && npm run dev`. Write `front/LLD.md` documenting your component structure. Reply in `front/REPLY.md`.
