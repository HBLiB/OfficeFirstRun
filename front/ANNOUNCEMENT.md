# Round 10 Task — Add Page Titles

Set the browser tab `<title>` dynamically per route:

- Home → "H-Network — Freelance Network & Security Specialist"
- Services → "Services — H-Network"
- Lab → "Lab — H-Network"
- About → "About — H-Network"
- Contact → "Contact — H-Network"
- Case Detail → "{case title} — H-Network" (use the fetched case study title)

Use a simple `useEffect` with `document.title = ...` in each page component. No new dependencies needed.

Reply in `front/REPLY.md`.
