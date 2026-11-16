# V1 feature guide

Paths below are relative to the repository root. This is the starting map for a
developer changing a feature; follow the relevant service before changing SQL.

## Backend V1

| Feature | Source | Behavior / extension point |
| --- | --- | --- |
| Server setup | `backend/app.js`, `config/db.js` | Express JSON/CORS setup; database checked before listen |
| Database | `backend/db/schema.sql`, `repositories/` | PostgreSQL users, projects, tasks; parameterized queries |
| Registration/login | `routes/authRoutes.js`, `controllers/authController.js`, `services/authService.js`, `repositories/userRepository.js` under `backend/` | Required-field validation, duplicate-email check, credential verification |
| Password security | `backend/utils/bcrypt.js` | Hash at registration, compare at login; never store plaintext |
| JWT | `backend/utils/jwt.js`, `middleware/authMiddleware.js` | Three-day token and verified `req.user` identity |
| Protected endpoints | `backend/routes/projectRoutes.js`, `taskRoutes.js`, `dashboardRoutes.js` | Router-level JWT middleware |
| Project CRUD | `backend/controllers/projectController.js`, `services/projectService.js`, `repositories/projectRepository.js` | Owned project creation/list/detail/update/delete |
| Task CRUD | Equivalent `taskController`, `taskService`, `taskRepository` files | Tasks nested under projects; task item checks use stored parent |
| Task status | `backend/services/taskService.js` | `pending`, `in-progress`, `completed`; create and update validate the enum |
| Dashboard | `backend/controllers/dashboardController.js`, `services/dashboardService.js`, `repositories/dashboardRepository.js` | Counts plus five most recently created projects/tasks |
| Error handling | `backend/middleware/asyncHandler.js`, `errorHandler.js`, `utils/appError.js` | Async error forwarding and JSON message responses |
| Authorization | Project/task services and owner-filtered repository lists | Data belongs to the token user; no teams or shared projects yet |

## Frontend V1, in build order

### 1. Setup

`frontend/package.json` and `vite.config.js` configure React 19, Vite 8, the React
Compiler plugin, Tailwind 4, React Router, Redux Toolkit/RTK Query, Axios, React Hook
Form, Zod, and Lucide. The lockfile records exact installed versions.

### 2. Authentication UI

`pages/Login.jsx` and `pages/Register.jsx` use `validations/authSchema.js`.
Registration checks matching passwords in the browser and sends `name`, `email`,
`password`. Login dispatches `thunks/authThunk.js`, and `store/slices/authSlice.js`
stores the token and decoded identity. `routes/ProtectedRoute.jsx` and
`PublicRoute.jsx` control navigation. Navbar dispatches logout.

Google buttons are visual placeholders; there is no OAuth flow. Client password
rules are stronger than the current backend's required-field checks.

### 3. Application layout

`layouts/DashboardLayout.jsx` composes `components/Navbar/Navbar.jsx`,
`components/Sidebar/Sidebar.jsx`, and `layouts/MainLayout.jsx`.
`hooks/useSidebar.jsx` manages desktop collapse and mobile/peek state.
`components/LiquidGlass/` provides the visual treatment; dotted backgrounds and
shared style tokens come from the CSS files.

The layout uses flex containers and a fixed navbar. The separate layout blueprint
proposes a future CSS Grid refactor and should not be copied as current architecture.

### 4. Reusable components

| Component(s) under `frontend/src/components/` | Contract |
| --- | --- |
| `Button.jsx`, `ButtonVariants.js` | Shared variants, disabled/loading presentation |
| `Input.jsx`, `Textarea.jsx` | Reusable labeled fields with error presentation and form props |
| `Select.jsx` | Controlled `value`, `onChange`, `onBlur`, `name`; use RHF `Controller` |
| `Loading.jsx` | Shared themed request/loading feedback |
| `ErrorState.jsx` | Page/form API error message |
| `EmptyState.jsx` | Empty lists and absent report data |
| `Modal/ConfirmModal.jsx`, `confirmConfig.js` | Parent supplies action/config, open state, pending state, error |
| `Error/` | Render and route error fallbacks; independent of request states |

Keep API calls in feature pages/hooks rather than adding persistence behavior to
these shared visual components. Accessibility still needs a full keyboard audit.

### 5. Projects

`pages/Projects.jsx` hosts `Project/ProjectList.jsx` and the create modal.
`Project/CreateProjectForm.jsx` validates with `projectSchema` and calls
`apis/projectApi.js`. `Project/ProjectDetails.jsx` loads one project, resets edit
fields from fetched data, confirms updates/deletion, and hosts its tasks.
Project mutations invalidate the project list/entity tags.

### 6. Tasks

`pages/Tasks.jsx` hosts `Task/TaskList.jsx` and the create form within project
details. `TaskCard.jsx` opens editing and confirms deletion. `TaskEditForm.jsx`
uses the task's stored project ID. `CreateNewTaskForm.jsx` and editing share
`validations/taskSchema.js`, `Task/TaskStatus.js`, and `Select` through `Controller`.
Task mutations invalidate entity and project-specific task-list tags.

When changing status values, update the backend service, frontend Zod enum, status
options/styles, dashboard SQL, API documentation, and verification scenarios together.

### 7. Dashboard

`pages/Dashboard.jsx` calls `apis/dashboardApi.js` and renders `UI/StatCard.jsx`,
`Project/ProjectHeader.jsx`, and `Task/TaskHeader.jsx`. Zero counts and empty recent
lists are valid states. Reports are aggregates and creation-ordered records, not an
event timeline. Refresh the browser when checking updated counts in V1.

### 8. State and API management

`store/store.js` installs the auth reducer and independent RTK Query APIs.
`apis/axios.js` adds bearer headers; `apis/baseQuery.js` adapts responses/errors.
Server records belong in RTK Query, session state in the auth slice, and transient
modal/edit state in the owning component. Cross-slice cache invalidation and clearing
caches on logout remain explicit follow-ups.

### 9. Reliability

Lazy page imports in `routes/router.jsx` are wrapped by `UI/SuspenseLoader.jsx`.
`components/Error/ErrorBoundary.jsx` handles render failures; router
`errorElement` entries handle route errors. Pages handle request loading/error/empty
states. Token expiry is checked on session restoration and outgoing requests; the
backend verifies each protected request. There is no refresh-token mechanism.

### 10. Theme

`components/Context/ThemeContext.jsx` is the provider, `Context/theme.js` is the
shared context, and `hooks/useTheme.js` exposes it to Navbar/Loading. Preference is
stored as `theme`, and CSS changes follow the root `dark` class. Storage failures
fall back to a usable in-memory theme.

### 11. V1 audit and handoff

The supplied V1 baseline included authentication feedback, Select integration,
field labels, task editing, dashboard empty states, and route fallbacks. Handoff
verification additionally fixed a missing registration `useState` import, explained
intentional catches, removed unused bindings, and separated theme hook/context
exports so lint passes. See [verification](verification.md) for evidence and gaps;
the earlier audit does not imply that all production requirements are complete.

## Commenting convention

Feature entry points have concise module comments describing responsibility and
important boundaries. Inline comments explain ownership, cache behavior, failure
handling, and non-obvious constraints. Avoid narrating obvious syntax or keeping
change-log notes such as “CHANGED” in code. Explain feature intent here, HTTP
contracts in the API reference, and future changes in the roadmap.
