# Changelog

Changes are grouped by delivered capability. This document does not assign
calendar dates to work whose original build dates were not recorded.

## Unreleased — V1 baseline and developer handoff

This branch imports previously uncommitted V1 code on top of the original setup.
V1 is a development milestone; no production release or deployment is implied.

### Backend V1

- Express/PostgreSQL backend with layered routes, controllers, services, repositories.
- Registration/login, bcrypt password hashing, three-day JWTs, protected endpoints.
- Project and task CRUD, parent-project ownership checks, validated task statuses.
- Dashboard counts and five recent projects/tasks scoped to the current user.
- Shared async and error middleware.

### Frontend V1

- React/Vite workspace with routing, Redux authentication, Axios, and RTK Query.
- Validated registration/login, logout, protected navigation, token expiry checks.
- Responsive application shell, reusable controls, confirmation dialogs, and
  loading/error/empty states.
- Project/task management and dashboard API integration.
- Lazy pages, Suspense, render/route fallbacks, persistent light/dark theme.

### Handoff improvements

- Source-backed README, onboarding, architecture/data model, feature map, API
  contracts, logical build timeline, AI roadmap, and verification/known-gap guide.
- Environment examples, schema bootstrap captured from the existing database,
  backend start/watch commands, and sanitized REST Client examples.
- Feature-boundary comments and explicit explanations for intentional error catches.
- Fixed missing registration `useState` import, unused bindings, and lint blockers;
  split theme context/hook exports for Fast Refresh compatibility.
- Contributor branch/commit/PR workflow, GitHub templates, and CI checks.
- Expanded ignores for local CLI state and credential/export files.

### Planned next

- AI fundamentals and provider boundary, followed by project planner, task generator,
  task assistant, and project summary. These features are not implemented yet.

## Initial setup

- Original repository commit `e4355ab` established the frontend scaffold and README.
- See [build progression](docs/build-progression.md) for V1's logical development flow.
