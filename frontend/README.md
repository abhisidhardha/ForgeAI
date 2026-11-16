# ForgeAI frontend

React/Vite browser application for ForgeAI's project and task management workflow.

Start with the [root README](../README.md) and [local setup](../docs/getting-started.md).
Feature implementation paths are in the [feature guide](../docs/features.md);
routes, state, authentication, and theme boundaries are in
[architecture](../docs/architecture.md).

## Commands

Run in this directory after `npm ci`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite, normally on port 5173 |
| `npm run lint` | Check JavaScript/JSX and React rules |
| `npm run build` | Produce the frontend bundle in ignored `dist/` |
| `npm run preview` | Preview the build; no development API proxy |

Copy `.env.example` to `.env`. The default `VITE_BASE_API_URL=/api` uses the
development proxy to the backend on port 5000. All `VITE_*` values are public.

AI features and production hosting are not implemented. See the
[roadmap](../docs/roadmap.md) and [known gaps](../docs/verification.md).
