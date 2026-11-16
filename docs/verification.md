# Verification and known gaps

## Handoff checks

These results describe local handoff verification, not production certification.
The checked environment used Node.js 26.13.0, npm 11.20.0, and the existing local
PostgreSQL connection. CI is configured separately for Node.js 24 and PostgreSQL 17.

| Check | Result / coverage |
| --- | --- |
| Frontend ESLint | Passed after fixing 26 reported errors |
| Frontend production build | Passed |
| Backend JavaScript syntax | Checked with `node --check` for each source file |
| V1 schema bootstrap | Applied successfully in a fresh temporary PostgreSQL schema |
| HTTP/database checks | 38 assertions passed against actual feature routers/controllers/services/repositories |
| Browser interaction/accessibility | Not executed in this handoff; use the scenarios below |
| GitHub-hosted CI | Workflow added; local checks are not proof of a hosted workflow result |

The ad hoc HTTP/database verification mounted the V1 routers in a temporary Express
server and redirected the shared pool to one transaction in a fresh test schema.
It covered registration, duplicate email, incorrect password, login, missing-token
rejection, project/task CRUD, all three statuses, report counts/recent records,
cross-user project/task rejection, and project-to-task cascade deletion.
All test data/schema changes were rolled back. Existing application records were
not changed. It also asserted the observed URL-parent mismatch behavior to confirm
the documented gap; that assertion is not a desired future API contract.

This was a one-time handoff check, not a committed regression suite. The backend
`npm test` script still exits with a placeholder error. CI checks source syntax
and empty-database schema application; it does not run those 38 assertions or a
browser suite. Establish repeatable behavior tests before expanding the API.

## Repeatable commands

From the repository root:

```sh
npm --prefix frontend run lint
npm --prefix frontend run build
git diff --check
```

Backend syntax commands and the Git review checklist are in
[CONTRIBUTING](../CONTRIBUTING.md). Run schema initialization only on an empty
disposable database when verifying bootstrap behavior.

## Browser and API acceptance checklist

Use disposable accounts A and B. Do not test destructive actions on valuable data.

| Area | Scenario | Expected behavior / current qualification |
| --- | --- | --- |
| Registration | Blank, malformed email, short/mismatched passwords | Client shows validation errors |
| Registration | New valid account; repeat email | Registration then login; duplicate email feedback |
| Login | Correct and incorrect credentials | Correct login reaches dashboard; wrong-password 401 currently redirects globally |
| Session | Reload with valid token | Remains authenticated |
| Session | Missing, malformed, or expired token | Protected navigation/API access rejected |
| Logout | Log out, then visit `/projects` | Redirects to login; cache cleanup needs separate correction below |
| Projects | Create/list/detail/edit | Persisted values appear after request succeeds |
| Project deletion | Cancel, then confirm deletion | Cancel preserves records; confirm deletes project and tasks |
| Tasks | Create/edit/delete inside project | Correct project list updates; confirmation cancel preserves task |
| Status | Pending -> In Progress -> Completed | Stored enum, label, and report count agree after refresh |
| Ownership | B requests A's projects/tasks | Empty owned lists; protected item operations reject access |
| Dashboard | New account and populated account | Zero/empty states or correct owned counts and up to five recent rows |
| Failure states | Stop backend; use invalid/missing IDs | Loading resolves to a useful error; see inconsistent input handling below |
| Theme | Switch light/dark and reload | Preference persists where storage is available |
| Layout | 375px, 768px, 1440px; sidebar/drawer | Navigation/content remain usable without overlap |
| Keyboard | Forms, status selector, modal, theme controls | Audit focus, labels, escape/enter behavior, and focus return |
| Deep links | Refresh `/projects/:id` | Works in Vite; deployed host will need SPA fallback |

## Known gaps and priorities

These findings are recorded from the current source and targeted checks. The list
is not an exhaustive security or production-readiness audit.

| Priority | Finding | Source / next action |
| --- | --- | --- |
| High | RTK Query caches are not reset on logout; another login in the same SPA may reuse cached records | `Navbar.jsx`, `authSlice.js`, `store.js`: clear all API caches at session boundaries and add two-account browser coverage |
| High | Backend validation is weaker than frontend validation and assumes field types | Controllers/services: add consistent server-side schemas, limits, ID validation, and predictable 400 responses |
| High | Task item routes ignore URL `projectId` | Task controller/service: require stored parent to match the requested project; retain owner checks |
| High before hosting | CORS reflects request origins; auth has no rate limiting; JWT is stored in localStorage; unexpected error messages are exposed | Design production origin policy, abuse controls, session/XSS protections, and sanitized errors |
| Medium | Dashboard cache is not invalidated by project/task mutations | Separate API slices: explicitly invalidate/refetch or share a cache boundary |
| Medium | Axios redirects every 401, including invalid login responses | `apis/axios.js`: separate login failure feedback from expired-session behavior |
| Medium | `/createProject` renders a modal form without required `onClose` | Remove/redirect this legacy route or support a standalone route; `/projects` modal is the intended flow |
| Medium | Task edit title/description validation errors are not passed to fields | `TaskEditForm.jsx`: display existing RHF/Zod field errors |
| Medium | Accessibility is incomplete | Audit custom Select accessible naming/relationships, modal focus management, and clickable theme icons |
| Medium | Project duplicate handling is inconsistent | Creation checks names, updates do not; design normalization/constraints and concurrent-conflict handling |
| Medium | No committed backend behavior/browser tests or versioned upgrade migrations | Add repeatable suites and a migration strategy before AI schema changes |
| Low / clarify UI | Google login buttons have no OAuth handlers | Remove/disable placeholder or implement through a separately scoped feature |
| Planned | Subtasks, steps, acceptance criteria, AI provider and AI endpoints do not exist | Follow the AI roadmap and design persistence explicitly |
| Planned | Production hosting, monitoring, backups, license decision | Maintainer decisions and deployment work remain pending |

The local schema has no task-status CHECK, foreign-key query indexes beyond primary
keys/unique email, or timestamp triggers. The bootstrap mirrors that state; future
constraints/indexes belong in reviewed migrations. `/health` is a process-liveness
check and not a continuing database-readiness check.

## Handoff fixes in this branch

- Imported `useState` so registration renders correctly.
- Removed unused imports/bindings and explained catches whose errors are already
  presented by RTK Query or whose browser storage may be unavailable.
- Separated theme context/hook exports from the provider for Fast Refresh.
- Scoped the Fast Refresh rule exception to the router configuration module.
- Added reproducible setup/schema examples and replaced a credential-bearing,
  incorrectly prefixed request example with disposable API examples.

The remaining items above are follow-up work, not silently included feature changes.
