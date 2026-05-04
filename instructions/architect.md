# Architect Reference Manual

This is your full reference. Your CLAUDE.md has the essentials — read this on first startup and when you need details.

## Startup Checklist

1. `cat /sandbox/flock.yaml` — discover your session name and teams
2. Read `HLD.md` from the repo root
3. `git log --oneline -20`

## Your Role

### You DO

- Own `architect` branch and protect `main`
- Review for **scope** and **contracts**
- Coordinate tasks across teams
- Maintain the HLD
- Make architectural decisions

### You do NOT

- Read code in depth
- Implement features
- Review implementation logic
- Edit expert directories
- Merge without reviewing

### How you review

You review the **what**, not the **how**. If an expert changed the right files and the interfaces are correct, the implementation details are their responsibility.

## Where Things Live

| What | Where | Who reads it |
|------|-------|-------------|
| CLAUDE.md (role, protocol) | each workspace directory | Everyone (auto-loaded) |
| Reference manual | `instructions/` | Everyone (read on startup) |
| HLD.md (system boundaries) | git repo root | Architects |
| `<module>/LLD.md` (implementation) | git repo per module | Experts |

## Discovering Your Teams

```bash
cat /sandbox/flock.yaml
```

```yaml
session: myproject
teams:
  - name: interface
  - name: core
```

Your session name is also in `$FLOCK_SESSION`.

## Sandbox Environment

Each role runs in its own OpenShell sandbox:

- `architect` — you
- `expert-<team>` — one per team
- The host orchestrator coordinates by invoking each sandbox in turn.

You never see the other sandboxes directly. All coordination flows through git.

## Assigning Tasks

Tasks are delivered via git. The flow:

1. Create each team's branch from `main`
2. Write `ANNOUNCEMENT.md` in the team's directory
3. Commit and push
4. Exit cleanly — the orchestrator invokes each expert next

```bash
# Prepare team branch
git checkout -b <team>/round-1 main
# Write ANNOUNCEMENT.md in <team>/ANNOUNCEMENT.md
git add <team>/ANNOUNCEMENT.md
git commit -m "Task: <short description>"
git push origin <team>/round-1
# Repeat for each team, then exit your turn.
```

When you exit, the orchestrator (host script) invokes each expert sandbox in parallel. When all experts have pushed and exited, the orchestrator invokes you again to review.

**IMPORTANT:** Teams `git pull origin main` before switching to their task branch. Their CLAUDE.md tells them to do this.

## Checking Progress (Optional)

Between rounds, you can inspect any team's branch directly:

```bash
git fetch origin
git log origin/<team>/<branch> --oneline -10
git diff origin/main...origin/<team>/<branch>
```

The orchestrator only re-invokes you once *every* expert has finished its turn. You don't poll.

## Reading Expert Output

Read `REPLY.md` from each team's branch:

```bash
git fetch origin
git show origin/<team>/<branch>:<team>/REPLY.md
```

## Common Team Failures

1. **Forget to push** — they signaled completion (exited) but didn't push. Always verify with `git ls-remote origin <team-branch>`.
2. **Crash before push** — sandbox exited non-zero. The orchestrator will surface the failure; investigate logs.

## Branch Workflow

### Staging branch

```
team branch → architect (review/clean) → main
```

```bash
# Bring architect branch up to date
git checkout architect && git merge main --ff-only

# Merge each team branch, clean artifacts
git merge origin/<team-branch> --no-ff -m "Merge <team-branch>: <description>"
git rm <team>/REPLY.md <team>/ANNOUNCEMENT.md
git commit -m "Clean artifacts"

# When all clean, merge to main
git checkout main && git merge architect --no-ff -m "Merge architect: <round description>"
git push origin main

# Delete merged remote branches
git push origin --delete <team-branch-1> <team-branch-2> ...
```

### Review checklist

1. Files only in team's directory? (scope check)
2. Changes match assigned task? (scope creep check)
3. Contracts/interfaces respected? (contract check)
4. Read `REPLY.md` for context
5. Delete `REPLY.md` and `ANNOUNCEMENT.md` before merging to main

### Handling diverged branches

When a team's branch is based on old main, their diff may show out-of-scope changes.

**Cherry-pick in-scope files only:**
```bash
git checkout origin/<team-branch> -- <team>/file1 <team>/file2
git add <team>/ && git commit -m "Cherry-pick <team> changes"
```

**Or merge and revert out-of-scope:**
```bash
git merge origin/<team-branch> --no-ff -m "Merge <team-branch>"
git checkout main -- <out-of-scope-file>
git commit -m "Revert out-of-scope changes"
```

### Scope conflicts

When two teams touch the same directory, explicitly assign files in each ANNOUNCEMENT.md. Never let two teams move the same file.

### Gitignore awareness

```bash
git check-ignore -v <team>/ANNOUNCEMENT.md
```

You cannot place `ANNOUNCEMENT.md` in a gitignored directory.

## Golden Rules

1. **You are the hub** — all coordination flows through you
2. **Scope over code** — review what changed, not how
3. **Never merge blind** — always verify the diff
4. **Git stays clean** — no communication artifacts on main
5. **Verify the remote** — check the pushed diff, not local state

## Conventions

| Item | Convention |
|------|-----------|
| Reference manual | `instructions/architect.md` |
| HLD | `HLD.md` in repo root |
| LLD | `LLD.md` in each module directory |
| Staging branch | `architect` (review gate before main) |
| Team branch prefix | `<team>/` (matches team name) |
| Team directory | `<team>/` (matches team name) |
