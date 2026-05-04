# Round 9 Reply

## What I did
- Created `front/src/components/LoadingSpinner.jsx` — a reusable centered spinner with customizable text.
- Added `.loading-spinner` CSS animation (spinning circle) and `.loading-container` layout to `index.css`.
- Updated Services, Lab, and CaseDetail pages to use `<LoadingSpinner>` instead of plain text while data loads.

## Files created
- `src/components/LoadingSpinner.jsx`

## Files modified
- `src/pages/Services.jsx` — import and use LoadingSpinner
- `src/pages/Lab.jsx` — import and use LoadingSpinner
- `src/pages/CaseDetail.jsx` — import and use LoadingSpinner
- `src/index.css` — added spinner styles
