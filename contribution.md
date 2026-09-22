Here's a lean collaboration guide for a 3-person team working on PayLab (or any shared repo):

## Team Setup (once, at the start)
- Agree on roles: e.g. Person A = backend, Person B = frontend, Person C = floats between both / owns the API contract and testing.
- Agree on the API contract *before* writing code — endpoint names, request/response shapes, error formats. Write it down somewhere all three can see (shared doc, Postman collection, or a `docs/api.md` in the repo).
- One shared GitHub repo, `main` branch protected — nobody pushes to `main` directly.

## Do's
- **Branch per feature**: `feature/auth-signup`, `feature/wallet-topup`, etc. Small, focused branches.
- **Pull before you push.** Every time. `git pull --rebase` to avoid messy merge commits.
- **Small, frequent commits** with clear messages ("add JWT validation middleware," not "fixes").
- **Review each other's PRs** — even a 2-minute glance from a teammate catches bugs and keeps everyone aware of the whole codebase, not just their own slice.
- **Communicate before touching shared files** (e.g. `models/`, `routes/index.js`) — a quick "I'm editing the Wallet schema, hold off" saves a merge conflict.
- **Sync daily** (even 10 minutes) — what you finished, what's blocked, what you're doing next.
- **Keep a shared `.env.example`** so nobody has to guess env vars, but never commit real `.env` files or secrets.
- **Write tests for money logic specifically** (transfers, balance updates) — this is the part where silent bugs are costliest.

## Don'ts
- **Don't push directly to `main`.** Every change goes through a pull request, even from the "lead."
- **Don't merge your own PR without at least one teammate's review**, if avoidable — three people is small enough that this is realistic.
- **Don't leave a branch open and unmerged for days.** Long-lived branches drift and cause painful merge conflicts.
- **Don't silently change the API contract** (renaming a field, changing a response shape) without telling whoever depends on it.
- **Don't commit `node_modules/`, `.env`, or database credentials.** Add them to `.gitignore` from day one.
- **Don't work on the same file/feature simultaneously without coordinating** — split by feature, not by file, wherever possible.
- **Don't skip testing the transfer/transaction flow together** before a demo — this is the feature most likely to break under real use (two people, real network, real timing).
