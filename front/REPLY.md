# Round 10 Reply

## What I did
Added dynamic browser tab titles to all six page components using `useEffect` + `document.title`:

- Home → "H-Network — Freelance Network & Security Specialist"
- Services → "Services — H-Network"
- Lab → "Lab — H-Network"
- About → "About — H-Network"
- Contact → "Contact — H-Network"
- Case Detail → "{case title} — H-Network" (dynamic, updates when study loads)

No new dependencies added.

## Files modified
- `src/pages/Home.jsx` — added useEffect import + title
- `src/pages/Services.jsx` — added title useEffect
- `src/pages/Lab.jsx` — added title useEffect
- `src/pages/About.jsx` — added useEffect import + title
- `src/pages/Contact.jsx` — added useEffect to import + title
- `src/pages/CaseDetail.jsx` — added dynamic title useEffect keyed on study
