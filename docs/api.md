# Backend V1 API reference

Default local origin: `http://localhost:5000`. Feature routes start with `/api`.
Requests and responses use JSON. Protected endpoints require:

```http
Authorization: Bearer <token returned by login>
Content-Type: application/json
```

IDs are PostgreSQL BIGINT values and normally serialize as strings. Use returned
IDs rather than assuming sequential values. There is no pagination, sorting
parameter, API version prefix, or refresh-token endpoint in V1.

## Health and authentication

| Method | Path | Body | Success |
| --- | --- | --- | --- |
| GET | `/health` | None | 200, `{ "status": "ok" }` |
| POST | `/api/auth/register` | `name`, `email`, `password` | 201, `{ "message": "User registered successfully" }` |
| POST | `/api/auth/login` | `email`, `password` | 200, `{ "message": "User login successfully", "token": "..." }` |

Health reports HTTP process liveness. It does not recheck database connectivity
after startup. Registration does not return a token; log in separately.

```json
{
  "name": "Example Developer",
  "email": "developer@example.test",
  "password": "Example-only-password-123!"
}
```

The backend currently checks required values but does not enforce the frontend's
email-format, eight-character password, or confirmation rules. Duplicate email
normally returns 409. Login returns 404 for an unknown user and 401 for a wrong
password. The current frontend globally redirects on 401, including login errors.
Tokens contain `id`, `email`, `name`, issuance/expiry claims, and expire after three
days. Logout clears browser state; there is no server token revocation endpoint.

## Projects (all protected)

| Method | Path | Body | Success data |
| --- | --- | --- | --- |
| POST | `/api/projects` | `name`, `description` | 201, created project |
| GET | `/api/projects` | None | 200, owned project array |
| GET | `/api/projects/:id` | None | 200, owned project |
| PUT | `/api/projects/:id` | `name`, `description` | 200, updated project |
| DELETE | `/api/projects/:id` | None | 200, deleted project |

```json
{
  "name": "Launch a portfolio",
  "description": "Build and publish a personal portfolio website."
}
```

Creation requires a truthy name; description is optional on the backend but required
by the frontend. Update requires both fields. Duplicate project names for the same
owner are checked on creation and return 400; updates have no equivalent check.
Lists have no guaranteed ordering. Project deletion cascades to its tasks.

Project record shape:

```json
{
  "id": "1",
  "name": "Launch a portfolio",
  "description": "Build and publish a personal portfolio website.",
  "owner_id": "1",
  "created_at": "2026-01-01T00:00:00.000Z",
  "updated_at": "2026-01-01T00:00:00.000Z"
}
```

Timestamps above are illustrative, not build dates. Database columns have no
timezone; serialization depends on the driver/runtime configuration.

## Tasks (all protected)

Base path: `/api/projects/:projectId/tasks`.

| Method | Suffix | Body | Success data |
| --- | --- | --- | --- |
| POST | Empty | `title`, `description`, `status` | 201, created task |
| GET | Empty | None | 200, project task array |
| GET | `/:id` | None | 200, task |
| PUT | `/:id` | `title`, `description`, `status` | 200, updated task |
| DELETE | `/:id` | None | 200, deleted task |

```json
{
  "title": "Build the portfolio home page",
  "description": "Add an introduction and featured project links.",
  "status": "pending"
}
```

Allowed statuses are exactly `pending`, `in-progress`, `completed`. Creation
requires a nonblank title and an explicit valid status; description is optional
on the backend. Update requires a nonblank title/description and valid status.
There is no PATCH/status-only endpoint: send the complete update payload.

Task records contain `id`, `title`, `description`, `status`, `project_id`,
`created_at`, `updated_at`. They do not contain subtasks, acceptance criteria,
assignees, priorities, due dates, or AI-generated fields yet.

Collection access checks the requested project's ownership. Item access loads the
task and checks its stored parent ownership; it currently ignores a mismatched
URL `projectId`. This is a known nested-route consistency gap.

## Dashboard (protected)

`GET /api/dashboard` returns:

```json
{
  "message": "Dashboard report fetched successfully",
  "data": {
    "projectsCount": 1,
    "tasksCount": {
      "total": 1,
      "pending": 1,
      "inProgress": 0,
      "completed": 0
    },
    "recentProjects": [],
    "recentTasks": []
  }
}
```

The numeric values/empty arrays above illustrate the contract. Recent arrays hold
up to five records ordered by creation time descending. Recent task records include
`id`, `title`, `description`, `status`, `project_id`, `created_at`; they omit
`updated_at`. All counts/records are scoped to the authenticated user.

## Response and error conventions

Project/task/dashboard success responses use `{ "message": "...", "data": ... }`.
Deletes return 200 with the deleted row, not 204. Errors from explicit validation,
authorization, or the shared error handler use `{ "message": "..." }`.

| Status | Current meaning |
| --- | --- |
| 400 | Required field/status failure or duplicate project name |
| 401 | Missing/invalid/expired token, or wrong login password |
| 403 | Existing project belongs to another user |
| 404 | Missing project/task, or unknown login email |
| 409 | Registration email already exists (normal precheck path) |
| 500 | Unexpected error, including some malformed input/database failures |

Validation is not yet a uniform server-side schema. Malformed IDs/types and
concurrent duplicate-email writes may surface database errors as 500 responses.
Unmatched API paths fall through to Express's default 404 response and need not
return the JSON envelope. Do not build new clients around the exact message text.

Use [request.http](../backend/request.http) for local examples and
[verification](verification.md) for the ownership regression checklist.
