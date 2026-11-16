# Build progression

This is a logical development timeline, reconstructed from the delivered code and
the project owner's handoff. It describes dependencies and sequence, not calendar
dates, effort estimates, or historical Git commits.

The repository originally contained one `Initial Setup` commit (`e4355ab`). Most
V1 application files were still in the local working tree. The handoff imports
that existing work as backend and frontend commits made now. Those commits are
not evidence of when individual V1 features were originally built.

## Phase 1: Backend V1 — implemented

| Step | What was built | Why it precedes the next step |
| --- | --- | --- |
| B1 | Node/Express server and database configuration | Establish a request runtime and persistent connection |
| B2 | Users, projects, tasks tables | Define identities and ownership relationships |
| B3 | Registration/login with bcrypt | Establish account identity without plaintext passwords |
| B4 | JWT generation, verification, auth middleware | Carry verified identity into protected requests |
| B5 | Project CRUD and ownership checks | Establish the parent entity for work |
| B6 | Task CRUD under projects | Attach work to an authorized project |
| B7 | Pending / In Progress / Completed status validation | Make progress measurable |
| B8 | Dashboard counts and recent-record queries | Aggregate existing project/task data |
| B9 | Shared error handling and authorization review | Give the frontend predictable failure behavior |

Deliverable: authenticated JSON API backed by PostgreSQL.

## Phase 2: Frontend V1 — implemented

| Step | What was built | Result |
| --- | --- | --- |
| F1 | React/Vite, routing, Redux, RTK Query, styling and forms | Frontend foundation |
| F2 | Registration, login, tokens, logout, protected routes | Authenticated browser workflow |
| F3 | Navbar, sidebar, responsive content, glass/dotted styling | Shared application shell |
| F4 | Fields, buttons, selectors, loading/errors/empty states, confirmations | Consistent feature building blocks |
| F5 | Project list/create/detail/update/delete | Complete project workflow |
| F6 | Project task list/create/edit/delete/status | Complete task workflow |
| F7 | Dashboard connected to reports API | Visible counts and recent records |
| F8 | Axios auth headers, Redux auth, RTK Query tags | Frontend/backend integration |
| F9 | Lazy pages, Suspense, error boundaries, expiry checks | Failure/loading behavior |
| F10 | Theme context, dark/light variables, persistence | Consistent theme switching |
| F11 | Frontend audit adjustments | Better auth feedback, fields, editing, and fallbacks |

Deliverable: a working project/task application. AI features are not implemented.

## Phase 3: Repository and developer handoff — this change

1. Inspect source and existing database schema.
2. Replace speculative README claims with implemented scope.
3. Add environment examples, database bootstrap, and runnable backend commands.
4. Add feature comments, architecture/API docs, and onboarding instructions.
5. Resolve frontend lint and registration blockers; record verification limits.
6. Import backend and frontend work in separate descriptive commits.
7. Commit contributor workflow, GitHub review templates, CI, roadmap, and changelog.
8. Publish the handoff branch for review; merge through the documented PR workflow.

## Phase 4: AI Integration V1 — next

Learn AI fundamentals, close baseline gaps that affect AI endpoints, introduce a
server-side provider boundary, then implement planner, generator, task assistant,
and project summary incrementally. Each step must preserve ownership and require
user review before generated content is saved. See [roadmap](roadmap.md).

## Later phases

Full landing page design is deferred. Production deployment remains pending.
Broader ideas from the original README (teams, RAG, autonomous agents, sprints,
deployment observability) are outside the agreed AI Integration V1 scope until
separately designed and prioritized.
