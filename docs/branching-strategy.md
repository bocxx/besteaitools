# Workflow Limitations & Branching Strategy

## Current state

- **Stack/deploy:** Astro site deployed to Cloudflare Workers via `wrangler`. `.github/workflows/deploy.yml` triggers on **every push to `main`** and runs `npm run deploy` (build + `wrangler deploy`). Concurrency group is `deploy-production`.
- **Practice:** Commits are pushed **directly to `main`**, and the history contains many automated `Auto-deploy: content update` commits.
- **Branch histories:** `main` is on a **rewritten/disjoint history**. `legacy-main` and nearly all other branches share **no common ancestor** with `main`.

## Limitations

1. **`main` = production, with no gate.** Any push to `main` deploys live immediately. There is no review, staging, or approval step between commit and production.
2. **No pull-request review loop.** Work lands directly on `main`, so changes are never reviewed before shipping, and there is no pre-merge CI gate (build / `astro check` / lint).
3. **Disjoint histories block normal PRs.** `main` cannot open or merge PRs with `legacy-main` and most `claude/*` / `seo/*` / `fix/*` branches — GitHub rejects them ("no history in common").
4. **History pollution.** Automated content commits interleave with real feature work on `main`, making it hard to scan, review, revert, or cherry-pick deliberate changes.
5. **No separation of preview vs. production.** A single `deploy-production` target means there is no safe place to validate a build before it is user-facing.
6. **Stale/orphaned branches accumulate.** Many old `claude/*` branches (several disjoint) linger with no merge target or cleanup.

## Proposed branching strategy

**Model: trunk-based development with short-lived feature branches and PR gating into `main`.**

### 1. Branch off `main`, always

Create work branches from current `main` so histories stay connected and PRs are mergeable:

```bash
git switch main && git pull
git switch -c feat/<short-description>
```

### 2. Naming conventions

- `feat/...` new features
- `fix/...` bug fixes
- `chore/...` tooling/infra
- `content/...` manual content edits
- Reserve automated content commits for the bot only (see #6).

### 3. Open a PR into `main`

- Push the branch and open a PR **before** merging.
- Keep PRs small and short-lived (merge within days, not weeks) to avoid drift.

### 4. Add a CI check workflow (pre-merge gate)

Add a separate workflow triggered on `pull_request` that runs build + type/lint checks **without deploying**:

```yaml
on:
  pull_request:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with: { node-version: "22", cache: npm }
      - run: npm ci
      - run: npx astro check
      - run: npm run build
```

Then enable **branch protection on `main`**: require PR + passing checks, disallow direct pushes (allowing an exception only for the deploy/content bot if needed).

### 5. Use preview deploys instead of shipping to validate

Keep `deploy.yml` (push to `main` → production) as-is, but add **per-PR preview deploys** using Cloudflare preview/versioned deploys (`wrangler versions upload`) so changes can be checked at a preview URL before merge — replacing the current "push to prod to see it" loop.

### 6. Isolate automated content commits

Have the content-generation automation commit to a dedicated branch and open a PR (or commit as a clearly-scoped bot user), rather than pushing `Auto-deploy: content update` straight onto `main`. This keeps `main`'s history readable and revertible.

### 7. Clean up the disjoint/stale branches

- Decide whether `legacy-main` is still needed; if it is purely historical, **archive it as a tag** (`git tag archive/legacy-main origin/legacy-main`) and delete the branch.
- Delete merged/abandoned `claude/*` branches. Since many are on disjoint histories they can never merge into `main` — preserve anything valuable as a tag, then remove.

### Resulting flow

```
feat/x  ──PR──▶  CI checks + preview deploy  ──review/merge──▶  main  ──auto-deploy──▶  production
```

This preserves the fast "merge = deploy" model for `main`, while adding a review/validation gate and ending the disjoint-history problem for all future branches (since they descend from `main`).
