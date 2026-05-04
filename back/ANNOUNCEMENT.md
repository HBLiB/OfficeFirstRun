# Round 10 Task — Add Stats Summary Endpoint

Add `GET /api/stats` to `back/main.py` returning a summary:

```json
{
  "total_services": 8,
  "total_case_studies": 4,
  "total_projects": 4,
  "total_contact_submissions": 12
}
```

- Service/case-study/project counts come from the seed data lengths.
- Contact submissions count comes from a `SELECT COUNT(*)` on the SQLite table.

Update `back/LLD.md` briefly. Reply in `back/REPLY.md`.
