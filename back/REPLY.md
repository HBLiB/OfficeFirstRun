# Round 10 Reply

## Status: Done

## What I did
- Added `GET /api/stats` endpoint returning counts of services, case studies, projects, and contact submissions
- Service/case-study/project counts derived from seed data lengths
- Contact submissions count via `SELECT COUNT(*)` on SQLite
- Updated `back/LLD.md`
