# Roadmap: AI Integration V1

## Current status

| Phase | Status | Evidence / next action |
| --- | --- | --- |
| Backend V1 | Implemented | Auth, owned projects/tasks, reports; see API reference |
| Frontend V1 | Implemented | Browser workflows, forms, themes, reliability boundaries |
| Developer handoff | Prepared in this branch | Setup, schema, comments, docs, CI, contribution workflow |
| AI fundamentals | Learning next | Understand model requests, tokens, output validation, failures, cost |
| AI integration | Not started | No provider, model, SDK, endpoint, or key configured |
| AI-powered features | Not started | Deliver the four features below incrementally |
| Full landing page | Deferred | Current `/` is a minimal welcome screen |
| Deployment | Pending | No production environment or deployment pipeline |

This roadmap orders work by dependency, not by dates or delivery commitments.

## A0. Close baseline gaps that affect AI work

Use the priorities in [verification](verification.md#known-gaps-and-priorities).
Before exposing AI endpoints, establish consistent server validation, task URL/parent
matching, session cache cleanup, predictable auth errors, and ownership regression
tests. These prevent existing edge cases from becoming part of the AI contract.

## A1. Learn and choose the smallest provider boundary

Understand prompts/messages, context limits, structured output, timeouts/retries,
rate limits, token usage/cost, and handling untrusted model output. Select a provider,
model, and SDK only after comparing current capabilities against the first feature.
No specific provider or model is committed by this document.

Add server-side configuration, a provider adapter, and an AI service boundary:

```text
Authorized request -> validated feature input -> AI service -> provider adapter
                   <- validated application output <- model response
```

Requirements:

- Keep provider secrets on the backend and out of `VITE_*`, Git, logs, and responses.
- Authorize project/task context before calling the provider.
- Send only necessary authorized data; treat project descriptions/model output as
  untrusted content rather than instructions granting extra access.
- Validate generated structure, field lengths, statuses, and item counts server-side.
- Set request timeouts, bounded retry behavior, output limits, and per-user budgets.
- Return understandable errors without exposing credentials or raw provider internals.
- Mock the adapter in deterministic tests; keep paid provider checks opt-in.
- Measure latency and usage without logging full private prompts by default.

Do not add agents, RAG, queues, or new databases unless a demonstrated requirement
needs them. They are not prerequisites for the four V1 AI features.

## A2. AI Project Planner

Input: a project idea and optional constraints. Output: an editable project title,
description, milestones/plan sections, and suggested tasks.

Acceptance criteria:

- A user can submit an idea and preview a structurally validated plan.
- Empty/oversized inputs, provider failures, and cancellation have clear UI states.
- The user can edit/select suggestions before an explicit save action.
- Saving creates only the accepted project/task records owned by that user.
- Milestones remain preview content until a separate persisted model is designed.
- Repeated save requests cannot silently create duplicate projects/tasks.

## A3. AI Task Generator

Input: an existing owned project's description and optional instructions. Output:
suggested tasks with titles/descriptions and supported initial statuses.

Acceptance criteria:

- Context is loaded by the backend after checking project ownership.
- Suggested tasks are previewed, editable, selectable, and individually removable.
- Task count/field limits are enforced and only explicit accepted tasks are saved.
- A bulk-save design defines transaction and retry behavior before implementation.
- Project/task/dashboard views refresh after saving.

## A4. AI Task Assistant

Input: an existing owned task plus minimal project context. Output: proposed
subtasks, implementation steps, and acceptance criteria.

Acceptance criteria:

- Suggestions are separated clearly and can be regenerated or edited.
- Generation does not overwrite the task automatically.
- Decide how to persist suggestions before shipping: V1 currently has no subtask,
  implementation-step, or acceptance-criteria columns/tables.
- Any schema change includes a forward migration, documented data behavior, and
  updated API/client contracts.

## A5. AI Project Summary

Input: an owned project's tasks and statuses. Output: a progress summary, remaining
work, and potential risks grounded in the available records.

Acceptance criteria:

- Counts/completion percentages come from application data; the model explains them.
- The response identifies the data scope and handles empty projects.
- A refresh reflects the current task state and indicates when the summary was made.
- Summaries do not invent due dates, estimates, assignments, or activity history
  absent from the current data model.

## Delivery and review

Use one focused feature branch/PR per slice, updating API docs, schema decisions,
feature status, changelog, and tests with each change. A suggested order is A0,
A1, planner preview, planner save, generator, assistant, summary.

For each AI feature, test authorization, input/output validation, provider timeout,
rate limiting, duplicate submissions, edit-before-save, and error recovery. Mark it
implemented only after the full reviewed workflow passes.

Production deployment planning follows its own checklist: host selection, HTTPS,
CORS origins, secret management, database access/backups, migrations, frontend SPA/API
routing, monitoring, and recovery. There is no deployed environment claimed today.
