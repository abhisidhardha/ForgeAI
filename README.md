# ForgeAI

ForgeAI is a project and task management web application built with React,
Express, and PostgreSQL. Users can register, manage their own projects and tasks,
track task status, and view dashboard statistics.

**Backend V1 and Frontend V1 are implemented. AI Integration V1 is the next phase;
AI features are not available yet.** Deployment is pending.

## What works today

- Registration/login, bcrypt password hashing, three-day JWT authentication, logout.
- Protected project CRUD and project-scoped task CRUD with ownership checks.
- Pending, In Progress, and Completed task statuses.
- Dashboard counts and up to five recent projects/tasks.
- Validated forms, confirmation dialogs, loading/error/empty states.
- Responsive navigation, glass/dotted styling, and persistent dark/light themes.
- Lazy pages, Suspense, render/route error fallbacks, and token expiry handling.

Google login buttons are placeholders. Recent activity means recently created
records, not an audit log. See [verification and known gaps](docs/verification.md)
for current limits.

## New developer: start here

Read the [onboarding index](docs/README.md), then follow the
[local setup guide](docs/getting-started.md). It covers PostgreSQL initialization,
environment configuration, startup, and your first end-to-end workflow.

```sh
git clone https://github.com/abhisidhardha/ForgeAI.git
cd ForgeAI
npm --prefix backend ci
npm --prefix frontend ci
```

Copy the environment examples, configure PostgreSQL, and apply
[backend/db/schema.sql](backend/db/schema.sql) to an empty database before starting.
Run `npm run dev` separately in `backend/` and `frontend/`.

Default URLs: frontend `http://localhost:5173`, API `http://localhost:5000/api`,
health `http://localhost:5000/health`. The development frontend proxies `/api`
to the backend. There is no root npm package.

## Technology and structure

| Area | Current implementation |
| --- | --- |
| Frontend | React 19, Vite 8, React Router, Tailwind CSS 4, Lucide |
| State / HTTP | Redux Toolkit, RTK Query, Axios |
| Forms | React Hook Form, Zod |
| Backend | Node.js, Express 5, CommonJS |
| Data / auth | PostgreSQL, pg, bcryptjs, jsonwebtoken |

Exact dependency versions are recorded in each package lockfile. CI uses Node.js 24.

```text
ForgeAI/
├── backend/
│   ├── app.js              # API startup
│   ├── config/             # PostgreSQL pool
│   ├── routes/             # Endpoint registration
│   ├── controllers/        # HTTP request/response handling
│   ├── services/           # Rules and ownership
│   ├── repositories/       # Parameterized SQL
│   ├── middleware/         # Authentication and errors
│   ├── utils/              # JWT, bcrypt, application errors
│   └── db/schema.sql       # Empty-database V1 bootstrap
├── frontend/
│   ├── src/
│   │   ├── apis/           # Axios and RTK Query APIs
│   │   ├── components/     # Shared controls, theme, error handling
│   │   ├── hooks/          # Sidebar, theme, modal helpers
│   │   ├── layouts/        # Shared application shell
│   │   ├── pages/          # Auth, dashboard, projects, tasks
│   │   ├── routes/         # Browser routes and guards
│   │   ├── store/          # Redux store and auth slice
│   │   ├── thunks/         # Login lifecycle
│   │   ├── validations/    # Client form schemas
│   │   └── styles/         # Shared styling
│   └── vite.config.js      # Build and development API proxy
├── docs/                   # Developer handoff
├── .github/                # CI and review/issue templates
├── CONTRIBUTING.md         # Branch, commit, PR, and comment conventions
└── CHANGELOG.md            # Delivered capabilities
```

## Documentation

| Guide | Purpose |
| --- | --- |
| [Local setup](docs/getting-started.md) | Run from a fresh checkout |
| [Architecture](docs/architecture.md) | Request flow, ownership, data model, design boundaries |
| [Feature guide](docs/features.md) | Find each feature's implementation |
| [Build progression](docs/build-progression.md) | Logical build sequence without invented dates |
| [API reference](docs/api.md) | Endpoints, payloads, errors, and current edge cases |
| [AI roadmap](docs/roadmap.md) | Next phases and acceptance criteria |
| [Verification](docs/verification.md) | Checks, manual scenarios, and known gaps |
| [Contributing](CONTRIBUTING.md) | Professional Git and review workflow |

## Next: AI Integration V1

The planned sequence is AI fundamentals, a server-side provider boundary, then:

1. **AI Project Planner:** turn an idea into an editable project plan.
2. **AI Task Generator:** suggest tasks from a project description.
3. **AI Task Assistant:** suggest subtasks, implementation steps, acceptance criteria.
4. **AI Project Summary:** explain progress using authorized task data.

No AI provider, model, SDK, or AI endpoint has been selected or implemented.
The full landing page is deferred. See the [roadmap](docs/roadmap.md).

## Checks and collaboration

```sh
npm --prefix frontend run lint
npm --prefix frontend run build
```

CI also checks backend JavaScript syntax and bootstraps a disposable PostgreSQL
database. Automated behavior tests are not yet established; `npm test` in `backend/`
is a placeholder. Follow [CONTRIBUTING](CONTRIBUTING.md) for feature branches,
descriptive commits, pull requests, and verification expectations.

No top-level LICENSE file has been adopted. Package metadata is not a substitute
for a repository-wide license.
