# Contributing to ForgeAI

Start with [developer onboarding](docs/README.md) and [local setup](docs/getting-started.md).
Keep each contribution focused and update documentation with the behavior it changes.

## Branch workflow

`main` is the reviewed baseline. The existing `develop` branch was present at the
initial setup and is not required by this workflow. Use short-lived branches from
the latest `main`; do not introduce a second integration path by accident.

```sh
git switch main
git pull --ff-only origin main
git switch -c feat/ai-project-planner
```

| Prefix | Use |
| --- | --- |
| `feat/` | A new user-facing capability |
| `fix/` | A behavior correction |
| `docs/` | Documentation only |
| `chore/` | Repository maintenance or a mixed baseline/handoff change |

The initial V1 import uses `chore/v1-documentation-handoff` because it contains the
previously uncommitted backend/frontend plus documentation and setup improvements.
It does not fabricate branches for features already built locally.

## Make reviewable commits

Use `type(scope): imperative description`, for example:

```text
feat(backend): establish authenticated project and task API
feat(frontend): establish project and task management interface
docs: add V1 onboarding and AI integration handoff
fix(auth): clear cached workspace data on logout
```

Use commit bodies for the reason, meaningful tradeoffs, and validation. Commit
dates reflect when the commit was made. The [build progression](docs/build-progression.md)
records logical implementation order rather than invented Git history.

Inspect and stage the files you intend to publish:

```sh
git status --short
git diff
git add path/to/changed-file
git diff --cached
git diff --cached --check
git commit -m "feat(planner): preview generated project plans"
git push -u origin feat/ai-project-planner
```

Do not commit `.env`, real tokens/passwords, database exports, local CLI account
state, dependencies, or build output. Commit lockfiles and sanitized environment
examples. Avoid force-pushing shared branches or rewriting published history.

## Pull requests and merges

1. Push the feature branch and open a PR targeting `main`.
2. Explain the concrete behavior before/after, validation performed, and known limits.
3. Include API/schema/environment/documentation changes in the same review.
4. Run the checks below and review the GitHub Actions result.
5. Merge after review. Prefer a merge commit when preserving an intentional sequence
   of commits, as in the V1 import. Squash routine feature branches when clearer.
6. Delete a merged branch only after confirming its work is included in `main`.

Repository administrators should configure branch protection/rulesets for `main`
to require PRs and the `Backend checks` / `Frontend checks` jobs. Workflow files do
not enforce these settings by themselves. Review requirements depend on team size.

## Validation

From the repository root:

```sh
npm --prefix frontend run lint
npm --prefix frontend run build
```

Backend JavaScript syntax check, in PowerShell:

```powershell
$backendFiles = Get-ChildItem backend -Recurse -File -Filter *.js |
    Where-Object { $_.FullName -notmatch '[\\/]node_modules[\\/]' }
foreach ($backendFile in $backendFiles) {
    node --check $backendFile.FullName
    if ($LASTEXITCODE -ne 0) { throw "Syntax check failed: $($backendFile.FullName)" }
}
```

The backend's existing `npm test` is a failing placeholder, not a test suite. CI
checks backend syntax and applies the schema to a disposable PostgreSQL service;
it does not yet cover authentication or UI behavior. Use the
[verification scenarios](docs/verification.md) for manual changes and add meaningful
regression tests for behavior changes, particularly authorization and AI features.

## Code and comments

- Keep HTTP handling in controllers, ownership/rules in services, and SQL in repositories.
- Use parameterized SQL; derive owner identity from the verified token.
- Keep React request state in RTK Query, session state in Redux auth, transient UI
  state in the owning component, and shared theme state in its context.
- Validate on the server even when a frontend Zod schema already checks input.
- Comment intent, invariants, failure recovery, and surprising behavior. Avoid
  line-by-line narration, abandoned code, tool-specific suppressions without a
  reason, and comments that claim planned features are implemented.
- Use module comments at feature boundaries; detailed workflows belong in `docs/`.
- Match the surrounding style. Do not mix broad formatting rewrites with a feature fix.

## Documentation updates

Update [API](docs/api.md) for endpoints, [architecture](docs/architecture.md) for
boundaries/data decisions, [features](docs/features.md) for implementation paths,
[roadmap](docs/roadmap.md) for future scope, and [CHANGELOG](CHANGELOG.md) for delivered
changes. Keep commands runnable and examples free of private data.

Do not claim a license has been adopted based only on a badge or package field.
The repository currently has no top-level LICENSE file; maintainers must choose one
before describing the repository as licensed under a specific license.
