# Local development

## Prerequisites

- Git.
- Node.js 24 LTS is the CI baseline. The local handoff checks used Node.js 26.13.0.
  The installed Vite package declares its own supported Node versions.
- npm (use the committed lockfiles with `npm ci`).
- A running PostgreSQL server and the `psql` client, or a SQL client capable of
  running the bootstrap script. The schema uses identity columns.

There is no root npm package. Run npm commands in `backend/` or `frontend/`.
Redis, containers, vector databases, and AI-provider accounts are not needed for V1.

## 1. Get the source and dependencies

```sh
git clone https://github.com/abhisidhardha/ForgeAI.git
cd ForgeAI
npm --prefix backend ci
npm --prefix frontend ci
```

If reviewing an unmerged handoff branch, check out
`chore/v1-documentation-handoff` before installing.

## 2. Configure the environment

From the repository root, in PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

On macOS/Linux, use `cp` in place of `Copy-Item`. Edit the copied files locally;
the real `.env` files are ignored by Git.

| Backend variable | Purpose | Example |
| --- | --- | --- |
| `PORT` | Express listening port | `5000` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Application database | `forgeai` |
| `DB_USER` | Database role with access to that database | `postgres` for local development |
| `DB_PASSWORD` | That role's password | Set locally |
| `JWT_SECRET` | Server-side signing and verification secret | Generate locally |
| `BCRYPT_SALT` | bcrypt cost/work factor, parsed as an integer | `12` |

Generate a random JWT secret locally and paste the result into `backend/.env`:

```sh
node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
```

The frontend has one variable: `VITE_BASE_API_URL=/api`. Vite proxies `/api` to
`http://localhost:5000` during development. If you change the backend port, also
change the proxy target in `frontend/vite.config.js`, or use an absolute API URL.
Restart Vite after changing its environment. All `VITE_*` values are public
browser configuration; provider keys and database credentials belong on the backend.

## 3. Create an empty database and apply the V1 schema

Adjust the role/host/port below for your installation. `-W` prompts for a password.

```sh
psql -h localhost -p 5432 -U postgres -W -c "CREATE DATABASE forgeai;"
psql -h localhost -p 5432 -U postgres -W -d forgeai -v ON_ERROR_STOP=1 -f backend/db/schema.sql
```

The [schema](../backend/db/schema.sql) captures the inspected V1 development
database: users, projects, tasks, identity IDs, timestamps, unique emails, and task
cascade deletion. It contains no user records, credentials, or seeds.

Apply it once to an empty database. It intentionally fails if the tables exist;
it is not an upgrade migration. Existing developers should keep their current
database. There is no migration runner or seed command yet. If your database has
drifted, compare it to this schema before planning a separate migration.

## 4. Start both applications

Terminal 1, from the repository root:

```sh
cd backend
npm run dev
```

Terminal 2, from the repository root:

```sh
cd frontend
npm run dev
```

Run the backend from its directory so dotenv finds `backend/.env`.
Use `npm start` there for the non-watch server.

Open `http://localhost:5173` (or the URL Vite prints). The API is normally
`http://localhost:5000/api`; its health route is `http://localhost:5000/health`.
Express starts only after a successful database connection check.

## 5. Verify the first workflow

1. Open `/register`, create a disposable account, then log in at `/login`.
2. Create a project, open it, and create a task with a description.
3. Edit the task and move its status through Pending, In Progress, Completed.
4. Edit the project, then check the dashboard after a browser refresh.
5. Toggle theme, reload, and verify that the choice persists.
6. Log out and confirm `/projects` redirects to `/login`.

See [verification](verification.md) for the full handoff checklist. Optional API
requests are in [backend/request.http](../backend/request.http); use disposable
credentials and keep real tokens out of commits.

## Common setup failures

| Symptom | What to check |
| --- | --- |
| Database connection refused | PostgreSQL is running; `DB_HOST`/`DB_PORT` are correct |
| Database authentication fails | The configured role, password, and database access |
| `relation ... does not exist` | Apply the schema to the same database configured in `.env` |
| bcrypt or JWT errors | `BCRYPT_SALT` is an integer; `JWT_SECRET` is set |
| API requests hit the frontend or return HTML | `VITE_BASE_API_URL=/api`; Vite was restarted |
| Proxy request fails | Backend is running on the configured proxy target |
| Direct deep link fails after hosting | The frontend host needs SPA fallback to `index.html` |

`npm run preview` serves a frontend build locally. In this Vite configuration it
inherits the `/api` proxy from `server.proxy`. This is a local convenience, not
production hosting configuration; deployed SPA/API routing remains pending.
